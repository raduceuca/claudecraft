import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { UserChoices } from './prompts.js';

// Mock fs-extra before importing scaffold
const mockPathExists = vi.fn();
const mockEnsureDir = vi.fn();
const mockCopy = vi.fn();
const mockReaddir = vi.fn().mockImplementation(async (_: string, options?: { withFileTypes?: boolean }) => {
  if (options?.withFileTypes) {
    return []; // Return empty Dirent array by default
  }
  return [];
});
const mockReadJson = vi.fn();
const mockWriteJson = vi.fn();
const mockWriteFile = vi.fn();

vi.mock('fs-extra', () => ({
  default: {
    pathExists: mockPathExists,
    ensureDir: mockEnsureDir,
    copy: mockCopy,
    readdir: mockReaddir,
    readJson: mockReadJson,
    writeJson: mockWriteJson,
    writeFile: mockWriteFile,
  },
}));

// Mock child_process
const mockExecSync = vi.fn();
vi.mock('child_process', () => ({
  execSync: mockExecSync,
}));

// Import after mocks are set up
const { scaffold, initExisting } = await import('./scaffold.js');

// Mock process.cwd
const originalCwd = process.cwd;

describe('scaffold', () => {
  const mockProgress = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (process as { cwd: () => string }).cwd = () => '/test/cwd';
  });

  afterEach(() => {
    (process as { cwd: () => string }).cwd = originalCwd;
  });

  describe('scaffold()', () => {
    const defaultChoices: UserChoices = {
      projectName: 'test-project',
      bundle: 'everything',
      selectedSkills: ['brainstorming', 'systematic-debugging'],
      includeHomepage: true,
      initGit: true,
    };

    it('throws error if directory already exists', async () => {
      mockPathExists.mockResolvedValueOnce(true);

      await expect(scaffold(defaultChoices, mockProgress)).rejects.toThrow(
        'DIR_EXISTS:test-project'
      );
    });

    it('creates project directory', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });

      await scaffold(defaultChoices, mockProgress);

      expect(mockEnsureDir).toHaveBeenCalledWith('/test/cwd/test-project');
    });

    it('copies base template', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('base')) return true;
        return false;
      });
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });

      await scaffold(defaultChoices, mockProgress);

      expect(mockCopy).toHaveBeenCalled();
    });

    it('creates .claude directories', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });

      await scaffold(defaultChoices, mockProgress);

      const ensureDirCalls = mockEnsureDir.mock.calls.map((c: unknown[]) => c[0] as string);
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('.claude'));
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('skills'));
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('commands'));
    });

    it('calls progress callback during scaffolding', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });

      await scaffold(defaultChoices, mockProgress);

      expect(mockProgress).toHaveBeenCalledWith(
        'scaffolding',
        expect.any(Number),
        expect.any(String)
      );
    });

    it('runs bun install', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });

      await scaffold(defaultChoices, mockProgress);

      expect(mockExecSync).toHaveBeenCalledWith(
        'bun install',
        expect.objectContaining({
          cwd: '/test/cwd/test-project',
        })
      );
    });

    it('throws error if bun install fails', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockImplementation((cmd: string) => {
        if (cmd === 'bun install') {
          throw new Error('Install failed');
        }
        return Buffer.from('');
      });

      await expect(scaffold(defaultChoices, mockProgress)).rejects.toThrow('INSTALL_FAILED');
    });

    it('initializes git when initGit is true', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockReturnValue(Buffer.from(''));

      await scaffold(defaultChoices, mockProgress);

      expect(mockExecSync).toHaveBeenCalledWith('git init', expect.any(Object));
      expect(mockExecSync).toHaveBeenCalledWith('git add .', expect.any(Object));
      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('git commit'),
        expect.any(Object)
      );
    });

    it('skips git init when initGit is false', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockReturnValue(Buffer.from(''));

      const choicesNoGit = { ...defaultChoices, initGit: false };
      await scaffold(choicesNoGit, mockProgress);

      const gitCalls = mockExecSync.mock.calls.filter((c: unknown[]) =>
        String(c[0]).startsWith('git')
      );
      expect(gitCalls.length).toBe(0);
    });

    it('creates blank App.tsx when includeHomepage is false', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockReturnValue(Buffer.from(''));

      const choicesNoHomepage = { ...defaultChoices, includeHomepage: false };
      await scaffold(choicesNoHomepage, mockProgress);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('App.tsx'),
        expect.stringContaining('export default function App()')
      );
    });

    it('returns ScaffoldResult with stats', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockReturnValue(Buffer.from('1M\t/test'));

      const result = await scaffold(defaultChoices, mockProgress);

      expect(result).toHaveProperty('files');
      expect(result).toHaveProperty('skills');
      expect(result).toHaveProperty('commands');
      expect(result).toHaveProperty('time');
      expect(result).toHaveProperty('deps');
      expect(result).toHaveProperty('disk');
      expect(result.skills).toBe(defaultChoices.selectedSkills.length);
    });

    it('updates package.json with project name', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('package.json')) return true;
        return false;
      });
      mockReaddir.mockResolvedValue([]);
      mockReadJson.mockResolvedValue({ name: 'template' });
      mockExecSync.mockReturnValue(Buffer.from(''));

      await scaffold(defaultChoices, mockProgress);

      expect(mockWriteJson).toHaveBeenCalledWith(
        expect.stringContaining('package.json'),
        expect.objectContaining({ name: 'test-project' }),
        expect.any(Object)
      );
    });
  });

  describe('initExisting()', () => {
    const defaultChoices = {
      selectedSkills: ['brainstorming', 'systematic-debugging'],
    };

    it('creates .claude directories', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      const ensureDirCalls = mockEnsureDir.mock.calls.map((c: unknown[]) => c[0] as string);
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('.claude'));
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('skills'));
      expect(ensureDirCalls).toContainEqual(expect.stringContaining('commands'));
    });

    it('copies selected skills', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('workflow/brainstorming')) return true;
        if (p.includes('workflow/systematic-debugging')) return true;
        return false;
      });
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      expect(mockCopy).toHaveBeenCalled();
    });

    it('copies commands directory', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('commands')) return true;
        return false;
      });
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      const copyCalls = mockCopy.mock.calls as Array<[string, string]>;
      const commandsCopy = copyCalls.find((c) => c[0].includes('commands'));
      expect(commandsCopy).toBeTruthy();
    });

    it('copies hooks directory', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('hooks')) return true;
        return false;
      });
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      const copyCalls = mockCopy.mock.calls as Array<[string, string]>;
      const hooksCopy = copyCalls.find((c) => c[0].includes('hooks'));
      expect(hooksCopy).toBeTruthy();
    });

    it('does not overwrite existing settings files', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('templates/settings')) return true;
        if (p.includes('.claude/') && !p.includes('templates')) return true;
        return false;
      });
      // For settings dir, return settings files; for .claude countFiles, return empty
      mockReaddir.mockImplementation(async (dir: string, options?: { withFileTypes?: boolean }) => {
        if (dir.includes('templates/settings')) {
          return ['settings.json'];
        }
        if (options?.withFileTypes) {
          return [];
        }
        return [];
      });

      await initExisting(defaultChoices, mockProgress);

      const copyCalls = mockCopy.mock.calls as Array<[string, string]>;
      const settingsCopy = copyCalls.find(
        (c) => c[0].includes('settings') && c[1].includes('.claude')
      );
      expect(settingsCopy).toBeFalsy();
    });

    it('creates CLAUDE.md if missing', async () => {
      mockPathExists.mockImplementation(async (p: string) => {
        if (p.includes('templates/base/CLAUDE.md')) return true;
        if (p.includes('CLAUDE.md') && !p.includes('templates')) return false;
        return false;
      });
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      const copyCalls = mockCopy.mock.calls as Array<[string, string]>;
      const claudeMdCopy = copyCalls.find(
        (c) => c[0].includes('CLAUDE.md') && c[1].includes('CLAUDE.md')
      );
      expect(claudeMdCopy).toBeTruthy();
    });

    it('returns ScaffoldResult with stats', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);

      const result = await initExisting(defaultChoices, mockProgress);

      expect(result).toHaveProperty('files');
      expect(result).toHaveProperty('skills');
      expect(result).toHaveProperty('commands');
      expect(result).toHaveProperty('time');
      expect(result).toHaveProperty('deps');
      expect(result).toHaveProperty('disk');
      expect(result.skills).toBe(defaultChoices.selectedSkills.length);
      expect(result.deps).toBe(0);
    });

    it('calls progress callback', async () => {
      mockPathExists.mockResolvedValue(false);
      mockReaddir.mockResolvedValue([]);

      await initExisting(defaultChoices, mockProgress);

      expect(mockProgress).toHaveBeenCalledWith(
        'scaffolding',
        expect.any(Number),
        expect.any(String)
      );
    });
  });
});

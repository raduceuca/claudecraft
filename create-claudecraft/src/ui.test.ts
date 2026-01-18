import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  renderHeader,
  renderMiniHeader,
  renderStepHeader,
  renderStepFooter,
  renderSpecs,
  renderAnnotation,
  renderError,
  renderProgress,
  renderProgressFooter,
  renderComplete,
  renderInitComplete,
  type ProgressTask,
} from './ui.js';

// Strip ANSI codes for easier assertions
// eslint-disable-next-line no-control-regex
const stripAnsi = (str: string): string => str.replace(/\x1b\[[0-9;]*m/g, '');

describe('ui', () => {
  describe('renderHeader', () => {
    it('returns non-empty string', () => {
      const result = renderHeader();
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('contains ASCII art elements', () => {
      const result = stripAnsi(renderHeader());
      // ASCII art uses box drawing chars like ██████╗ for letters
      expect(result).toContain('██');
      expect(result).toContain('╗');
    });

    it('contains frame elements', () => {
      const result = stripAnsi(renderHeader());
      expect(result).toContain('72 COLS');
      expect(result).toContain('CAP HT');
      expect(result).toContain('BASELINE');
    });

    it('contains version info', () => {
      const result = stripAnsi(renderHeader());
      expect(result).toMatch(/REV \d+\.\d+\.\d+/);
    });

    it('contains CMYK markers', () => {
      const result = stripAnsi(renderHeader());
      expect(result).toContain('C');
      expect(result).toContain('M');
      expect(result).toContain('Y');
      expect(result).toContain('K');
    });
  });

  describe('renderMiniHeader', () => {
    it('returns non-empty string', () => {
      const result = renderMiniHeader();
      expect(result).toBeTruthy();
    });

    it('contains logo text', () => {
      const result = stripAnsi(renderMiniHeader());
      expect(result).toContain('CLAUDECRAFT');
    });

    it('contains version', () => {
      const result = stripAnsi(renderMiniHeader());
      expect(result).toMatch(/v\d+\.\d+\.\d+/);
    });
  });

  describe('renderStepHeader', () => {
    it('returns mini header output', () => {
      const result = renderStepHeader(1, 4, 'Test Step', true);
      expect(result).toBeTruthy();
      expect(stripAnsi(result)).toContain('CLAUDECRAFT');
    });
  });

  describe('renderStepFooter', () => {
    it('returns empty string', () => {
      expect(renderStepFooter()).toBe('');
    });
  });

  describe('renderSpecs', () => {
    it('formats specs with labels and values', () => {
      const specs = [
        { label: 'name', value: 'my-project' },
        { label: 'version', value: '1.0.0' },
      ];
      const result = stripAnsi(renderSpecs(specs));
      expect(result).toContain('name:');
      expect(result).toContain('my-project');
      expect(result).toContain('version:');
      expect(result).toContain('1.0.0');
    });

    it('handles empty array', () => {
      const result = renderSpecs([]);
      expect(result).toBe('');
    });
  });

  describe('renderAnnotation', () => {
    it('formats annotation text', () => {
      const result = stripAnsi(renderAnnotation('Some annotation'));
      expect(result).toContain('Some annotation');
      expect(result).toContain('│'); // Box drawing vertical line
    });
  });

  describe('renderError', () => {
    it('includes title and body', () => {
      const result = stripAnsi(renderError('Test Error', 'Error details here'));
      expect(result).toContain('ERROR');
      expect(result).toContain('Test Error');
      expect(result).toContain('Error details here');
    });

    it('handles multiline body', () => {
      const body = 'Line 1\nLine 2\nLine 3';
      const result = stripAnsi(renderError('Multi Error', body));
      expect(result).toContain('Line 1');
      expect(result).toContain('Line 2');
      expect(result).toContain('Line 3');
    });

    it('contains frame elements', () => {
      const result = renderError('Test', 'Body');
      expect(result).toContain('╭');
      expect(result).toContain('╰');
    });
  });

  describe('renderProgress', () => {
    it('renders done tasks with checkmark', () => {
      const tasks: ProgressTask[] = [{ name: 'scaffolding', status: 'done' }];
      const result = stripAnsi(renderProgress(tasks));
      expect(result).toContain('done');
      expect(result).toContain('scaffolding');
    });

    it('renders active tasks with percentage', () => {
      const tasks: ProgressTask[] = [{ name: 'scaffolding', status: 'active', progress: 50 }];
      const result = stripAnsi(renderProgress(tasks));
      expect(result).toContain('50%');
      expect(result).toContain('scaffolding');
    });

    it('renders queued tasks as waiting', () => {
      const tasks: ProgressTask[] = [{ name: 'git init', status: 'queued' }];
      const result = stripAnsi(renderProgress(tasks));
      expect(result).toContain('waiting');
    });

    it('includes detail when provided', () => {
      const tasks: ProgressTask[] = [
        { name: 'scaffolding', status: 'active', progress: 30, detail: 'copying files' },
      ];
      const result = stripAnsi(renderProgress(tasks));
      expect(result).toContain('copying files');
    });

    it('numbers tasks', () => {
      const tasks: ProgressTask[] = [
        { name: 'task1', status: 'done' },
        { name: 'task2', status: 'active', progress: 50 },
        { name: 'task3', status: 'queued' },
      ];
      const result = stripAnsi(renderProgress(tasks));
      expect(result).toContain('1');
      expect(result).toContain('2');
      expect(result).toContain('3');
    });

    it('contains progress frame', () => {
      const tasks: ProgressTask[] = [{ name: 'test', status: 'done' }];
      const result = renderProgress(tasks);
      expect(result).toContain('PROGRESS');
    });
  });

  describe('renderProgressFooter', () => {
    it('shows elapsed time', () => {
      const result = stripAnsi(renderProgressFooter('5.2s', '~10s'));
      expect(result).toContain('elapsed');
      expect(result).toContain('5.2s');
    });

    it('contains closing frame', () => {
      const result = renderProgressFooter('1s', '2s');
      expect(result).toContain('╰');
    });
  });

  describe('renderComplete', () => {
    let randomSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    });

    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('shows project name in next steps', () => {
      const result = stripAnsi(renderComplete('my-project', { files: 48, skills: 27, time: '3.5s' }));
      expect(result).toContain('cd my-project');
    });

    it('shows bun dev command', () => {
      const result = stripAnsi(renderComplete('test', { files: 10, skills: 5, time: '1s' }));
      expect(result).toContain('bun dev');
    });

    it('shows stats section', () => {
      const result = stripAnsi(renderComplete('test', { files: 48, skills: 27, time: '3.5s' }));
      expect(result).toContain('STATS');
      expect(result).toContain('files');
      expect(result).toContain('skills');
      expect(result).toContain('time');
    });

    it('shows commands section', () => {
      const result = stripAnsi(renderComplete('test', { files: 10, skills: 5, time: '1s' }));
      expect(result).toContain('COMMANDS');
      expect(result).toContain('/build');
      expect(result).toContain('/brainstorm');
    });

    it('includes default port', () => {
      const result = stripAnsi(renderComplete('test', { files: 10, skills: 5, time: '1s' }));
      expect(result).toContain('localhost:6969');
    });

    it('contains completion frame', () => {
      const result = renderComplete('test', { files: 10, skills: 5, time: '1s' });
      expect(result).toContain('COMPLETE');
      expect(result).toContain('Ready');
    });
  });

  describe('renderInitComplete', () => {
    let randomSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    });

    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('shows added directories', () => {
      const result = stripAnsi(
        renderInitComplete({ files: 35, skills: 27, commands: 7, time: '1.2s' })
      );
      expect(result).toContain('.claude/skills/');
      expect(result).toContain('.claude/commands/');
      expect(result).toContain('.claude/hooks/');
    });

    it('shows stats', () => {
      const result = stripAnsi(
        renderInitComplete({ files: 35, skills: 27, commands: 7, time: '1.2s' })
      );
      expect(result).toContain('files');
      expect(result).toContain('skills');
      expect(result).toContain('time');
    });

    it('shows next steps', () => {
      const result = stripAnsi(
        renderInitComplete({ files: 35, skills: 27, commands: 7, time: '1.2s' })
      );
      expect(result).toContain('NEXT');
      expect(result).toContain('/brainstorm');
      expect(result).toContain('/write-plan');
    });

    it('shows Figma integration instructions', () => {
      const result = stripAnsi(
        renderInitComplete({ files: 35, skills: 27, commands: 7, time: '1.2s' })
      );
      expect(result).toContain('FIGMA');
      expect(result).toContain('mcp add');
    });

    it('contains init complete frame', () => {
      const result = renderInitComplete({ files: 10, skills: 5, commands: 3, time: '1s' });
      expect(result).toContain('INIT COMPLETE');
      expect(result).toContain('Skills injected');
    });
  });
});

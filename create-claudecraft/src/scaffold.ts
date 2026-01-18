import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import type { UserChoices } from './prompts.js';
import { SKILLS } from './constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

export interface ScaffoldResult {
  files: number;
  skills: number;
  commands: number;
  time: string;
  deps: number;
  disk: string;
}

type ProgressCallback = (task: string, progress: number, detail?: string) => void;

export async function scaffold(
  choices: UserChoices,
  onProgress: ProgressCallback
): Promise<ScaffoldResult> {
  const startTime = Date.now();
  const targetDir = path.resolve(process.cwd(), choices.projectName);

  // Check if directory exists
  if (await fs.pathExists(targetDir)) {
    throw new Error(`DIR_EXISTS:${choices.projectName}`);
  }

  // Create directory
  await fs.ensureDir(targetDir);

  // Copy base template
  onProgress('scaffolding', 10, 'base files');
  const baseDir = path.join(TEMPLATES_DIR, 'base');
  if (await fs.pathExists(baseDir)) {
    await fs.copy(baseDir, targetDir);
  }

  // Ensure .claude directories exist
  const claudeDir = path.join(targetDir, '.claude');
  const skillsDir = path.join(claudeDir, 'skills');
  const commandsDir = path.join(claudeDir, 'commands');
  await fs.ensureDir(skillsDir);
  await fs.ensureDir(commandsDir);

  // Copy selected skills
  onProgress('scaffolding', 30, 'skills');

  for (const skillName of choices.selectedSkills) {
    const skill = SKILLS.find((s) => s.name === skillName);
    if (!skill) continue;

    // Try workflow first, then design
    let sourceDir = path.join(TEMPLATES_DIR, 'skills', 'workflow', skillName);
    if (!(await fs.pathExists(sourceDir))) {
      sourceDir = path.join(TEMPLATES_DIR, 'skills', 'design', skillName);
    }

    if (await fs.pathExists(sourceDir)) {
      await fs.copy(sourceDir, path.join(skillsDir, skillName));
    }
  }

  // Copy commands
  onProgress('scaffolding', 50, 'commands');
  const commandsSrc = path.join(TEMPLATES_DIR, 'commands');
  if (await fs.pathExists(commandsSrc)) {
    await fs.copy(commandsSrc, commandsDir);
  }

  // Copy hooks
  onProgress('scaffolding', 55, 'hooks');
  const hooksSrc = path.join(TEMPLATES_DIR, 'hooks');
  const hooksDir = path.join(claudeDir, 'hooks');
  if (await fs.pathExists(hooksSrc)) {
    await fs.ensureDir(hooksDir);
    await fs.copy(hooksSrc, hooksDir);
  }

  // Copy settings files
  const settingsSrc = path.join(TEMPLATES_DIR, 'settings');
  if (await fs.pathExists(settingsSrc)) {
    const files = await fs.readdir(settingsSrc);
    for (const file of files) {
      await fs.copy(path.join(settingsSrc, file), path.join(claudeDir, file));
    }
  }

  // Copy components
  onProgress('scaffolding', 60, 'components');
  const componentsSrc = path.join(TEMPLATES_DIR, 'components');
  const componentsDir = path.join(targetDir, 'src', 'components');
  if (await fs.pathExists(componentsSrc)) {
    await fs.ensureDir(componentsDir);
    await fs.copy(componentsSrc, componentsDir);
  }

  // Copy context
  onProgress('scaffolding', 65, 'context');
  const contextSrc = path.join(TEMPLATES_DIR, 'context');
  const contextDir = path.join(targetDir, 'src', 'context');
  if (await fs.pathExists(contextSrc)) {
    await fs.ensureDir(contextDir);
    await fs.copy(contextSrc, contextDir);
  }

  // Copy lib
  const libSrc = path.join(TEMPLATES_DIR, 'lib');
  const libDir = path.join(targetDir, 'src', 'lib');
  if (await fs.pathExists(libSrc)) {
    await fs.ensureDir(libDir);
    await fs.copy(libSrc, libDir);
  }

  // Copy types
  const typesSrc = path.join(TEMPLATES_DIR, 'types');
  const typesDir = path.join(targetDir, 'src', 'types');
  if (await fs.pathExists(typesSrc)) {
    await fs.ensureDir(typesDir);
    await fs.copy(typesSrc, typesDir);
  }

  // Copy homepage or create blank App
  onProgress('scaffolding', 70, 'pages');
  const pagesDir = path.join(targetDir, 'src', 'pages');
  await fs.ensureDir(pagesDir);

  if (choices.includeHomepage) {
    const homepageSrc = path.join(TEMPLATES_DIR, 'homepage');
    if (await fs.pathExists(homepageSrc)) {
      await fs.copy(homepageSrc, pagesDir);
    }

    // Copy the full App.tsx that includes routing
    const appSrc = path.join(TEMPLATES_DIR, 'app', 'App.tsx');
    if (await fs.pathExists(appSrc)) {
      await fs.copy(appSrc, path.join(targetDir, 'src', 'App.tsx'));
    }
  } else {
    // Create blank App.tsx
    const blankApp = `export default function App() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content flex items-center justify-center">
      <h1 className="text-2xl font-bold">Your mass of pixels starts here.</h1>
    </div>
  )
}
`;
    await fs.writeFile(path.join(targetDir, 'src', 'App.tsx'), blankApp);

    // Create blank NotFoundPage
    const notFound = `import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-base-content/70 mb-8">
          This page doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  )
}
`;
    await fs.writeFile(path.join(pagesDir, 'NotFoundPage.tsx'), notFound);
  }

  // Update package.json with project name
  onProgress('scaffolding', 80, 'package.json');
  const pkgPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = choices.projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // Copy main.tsx
  const mainSrc = path.join(TEMPLATES_DIR, 'main.tsx');
  if (await fs.pathExists(mainSrc)) {
    await fs.copy(mainSrc, path.join(targetDir, 'src', 'main.tsx'));
  }

  // Copy index.css
  const cssSrc = path.join(TEMPLATES_DIR, 'index.css');
  if (await fs.pathExists(cssSrc)) {
    await fs.copy(cssSrc, path.join(targetDir, 'src', 'index.css'));
  }

  // Copy vite-env.d.ts
  const viteSrc = path.join(TEMPLATES_DIR, 'vite-env.d.ts');
  if (await fs.pathExists(viteSrc)) {
    await fs.copy(viteSrc, path.join(targetDir, 'src', 'vite-env.d.ts'));
  }

  onProgress('scaffolding', 100, 'done');

  // Install dependencies
  onProgress('dependencies', 0, 'bun install');
  try {
    execSync('bun install', { cwd: targetDir, stdio: 'pipe' });
  } catch {
    throw new Error('INSTALL_FAILED');
  }
  onProgress('dependencies', 100, 'done');

  // Git init
  if (choices.initGit) {
    onProgress('git init', 0, '.git/');
    try {
      execSync('git init', { cwd: targetDir, stdio: 'pipe' });
      execSync('git add .', { cwd: targetDir, stdio: 'pipe' });
      execSync('git commit -m "init: claudecraft scaffolding"', {
        cwd: targetDir,
        stdio: 'pipe',
      });
    } catch {
      // Git init failed, not critical
    }
    onProgress('git init', 100, 'done');
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const files = await countFiles(targetDir);
  const diskUsage = await getDiskUsage(targetDir);

  return {
    files,
    skills: choices.selectedSkills.length,
    commands: 6,
    time: `${elapsed}s`,
    deps: 24,
    disk: diskUsage,
  };
}

/**
 * Initialize claudecraft in an existing project
 * Only adds .claude folder with skills, commands, hooks, settings
 */
export async function initExisting(
  choices: { selectedSkills: string[] },
  onProgress: ProgressCallback
): Promise<ScaffoldResult> {
  const startTime = Date.now();
  const targetDir = process.cwd();

  // Ensure .claude directories exist
  onProgress('scaffolding', 10, '.claude/');
  const claudeDir = path.join(targetDir, '.claude');
  const skillsDir = path.join(claudeDir, 'skills');
  const commandsDir = path.join(claudeDir, 'commands');
  await fs.ensureDir(skillsDir);
  await fs.ensureDir(commandsDir);

  // Copy selected skills
  onProgress('scaffolding', 30, 'skills');

  for (const skillName of choices.selectedSkills) {
    const skill = SKILLS.find((s) => s.name === skillName);
    if (!skill) continue;

    // Try workflow first, then design
    let sourceDir = path.join(TEMPLATES_DIR, 'skills', 'workflow', skillName);
    if (!(await fs.pathExists(sourceDir))) {
      sourceDir = path.join(TEMPLATES_DIR, 'skills', 'design', skillName);
    }

    if (await fs.pathExists(sourceDir)) {
      await fs.copy(sourceDir, path.join(skillsDir, skillName));
    }
  }

  // Copy commands
  onProgress('scaffolding', 50, 'commands');
  const commandsSrc = path.join(TEMPLATES_DIR, 'commands');
  if (await fs.pathExists(commandsSrc)) {
    await fs.copy(commandsSrc, commandsDir);
  }

  // Copy hooks
  onProgress('scaffolding', 70, 'hooks');
  const hooksSrc = path.join(TEMPLATES_DIR, 'hooks');
  const hooksDir = path.join(claudeDir, 'hooks');
  if (await fs.pathExists(hooksSrc)) {
    await fs.ensureDir(hooksDir);
    await fs.copy(hooksSrc, hooksDir);
  }

  // Copy settings files
  onProgress('scaffolding', 85, 'settings');
  const settingsSrc = path.join(TEMPLATES_DIR, 'settings');
  if (await fs.pathExists(settingsSrc)) {
    const files = await fs.readdir(settingsSrc);
    for (const file of files) {
      const destPath = path.join(claudeDir, file);
      // Don't overwrite existing settings
      if (!(await fs.pathExists(destPath))) {
        await fs.copy(path.join(settingsSrc, file), destPath);
      }
    }
  }

  // Create or update CLAUDE.md if it doesn't exist
  const claudeMdPath = path.join(targetDir, 'CLAUDE.md');
  if (!(await fs.pathExists(claudeMdPath))) {
    const claudeMdSrc = path.join(TEMPLATES_DIR, 'base', 'CLAUDE.md');
    if (await fs.pathExists(claudeMdSrc)) {
      await fs.copy(claudeMdSrc, claudeMdPath);
    }
  }

  onProgress('scaffolding', 100, 'done');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const claudeFiles = await countFiles(claudeDir);

  return {
    files: claudeFiles,
    skills: choices.selectedSkills.length,
    commands: 7,
    time: `${elapsed}s`,
    deps: 0,
    disk: '~500kb',
  };
}

async function countFiles(dir: string): Promise<number> {
  let count = 0;
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.git') continue;
    if (item.isDirectory()) {
      count += await countFiles(path.join(dir, item.name));
    } else {
      count++;
    }
  }
  return count;
}

async function getDiskUsage(dir: string): Promise<string> {
  try {
    const result = execSync(`du -sh "${dir}" | cut -f1`, { encoding: 'utf-8' });
    return result.trim();
  } catch {
    return '~4mb';
  }
}

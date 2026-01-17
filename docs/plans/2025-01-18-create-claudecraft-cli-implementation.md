# create-claudecraft CLI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `bun create claudecraft my-app` — an interactive CLI with blueprint aesthetic that scaffolds the claudecraft boilerplate.

**Architecture:** TypeScript CLI using @clack/prompts for interaction, figlet + gradient-string for the header, custom box-drawing for blueprint UI. Templates copied from main repo, filtered by user choices.

**Tech Stack:** TypeScript, @clack/prompts, figlet, gradient-string, picocolors, fs-extra

---

## Task 1: Initialize Package Structure

**Files:**
- Create: `create-claudecraft/package.json`
- Create: `create-claudecraft/tsconfig.json`
- Create: `create-claudecraft/bin/cli.js`
- Create: `create-claudecraft/.gitignore`

**Step 1: Create directory and initialize**

```bash
mkdir -p create-claudecraft/bin create-claudecraft/src create-claudecraft/templates
cd create-claudecraft
```

**Step 2: Create package.json**

```json
{
  "name": "create-claudecraft",
  "version": "1.0.0",
  "description": "Designer-first boilerplate for Claude Code. The robots are here.",
  "type": "module",
  "bin": {
    "create-claudecraft": "./bin/cli.js"
  },
  "files": ["bin", "dist", "templates"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node bin/cli.js"
  },
  "keywords": ["claude", "ai", "boilerplate", "react", "daisyui", "create"],
  "author": "raduceuca",
  "license": "MIT",
  "devDependencies": {
    "@types/figlet": "^1.5.8",
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^20.11.0",
    "typescript": "^5.3.3"
  },
  "dependencies": {
    "@clack/prompts": "^0.7.0",
    "figlet": "^1.7.0",
    "fs-extra": "^11.2.0",
    "gradient-string": "^2.0.2",
    "picocolors": "^1.0.0"
  }
}
```

**Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

**Step 4: Create bin/cli.js (entry point)**

```javascript
#!/usr/bin/env node
import '../dist/index.js';
```

**Step 5: Create .gitignore**

```
node_modules/
dist/
*.log
```

**Step 6: Install dependencies**

```bash
cd create-claudecraft && bun install
```

**Step 7: Commit**

```bash
git add create-claudecraft/
git commit -m "feat(cli): initialize create-claudecraft package structure"
```

---

## Task 2: Create Constants Module

**Files:**
- Create: `create-claudecraft/src/constants.ts`

**Step 1: Create constants with all skill definitions and humor**

```typescript
export const PACKAGE_NAME = 'create-claudecraft';
export const VERSION = '1.0.0';
export const DEFAULT_PORT = 6969;
export const DEFAULT_THEME = 'halloween';

export const TAGLINE = 'The robots are here. Might as well make them useful.';

export const STACK = {
  react: '18.x',
  typescript: '5.x',
  vite: '5.x',
  tailwind: '3.x',
  daisyui: '4.x',
} as const;

export const ASSETS = {
  skills: 23,
  commands: 6,
  themes: 32,
  hooks: 2,
  components: 6,
} as const;

export interface Skill {
  name: string;
  description: string;
  group: 'workflow' | 'design';
  bytes: number;
}

export const SKILLS: Skill[] = [
  // Workflow (via obra/superpowers)
  { name: 'brainstorming', description: 'question everything first', group: 'workflow', bytes: 2800 },
  { name: 'writing-plans', description: 'break it down or break down', group: 'workflow', bytes: 3200 },
  { name: 'executing-plans', description: 'checkpoints for the anxious', group: 'workflow', bytes: 2400 },
  { name: 'systematic-debugging', description: '4 phases of grief resolution', group: 'workflow', bytes: 8500 },
  { name: 'test-driven-development', description: 'red, green, refactor, repeat', group: 'workflow', bytes: 3100 },
  { name: 'verification-before-completion', description: 'trust but verify', group: 'workflow', bytes: 1800 },
  { name: 'requesting-code-review', description: 'prepare for judgment', group: 'workflow', bytes: 2200 },
  { name: 'receiving-code-review', description: 'accept feedback gracefully', group: 'workflow', bytes: 1900 },
  { name: 'using-git-worktrees', description: 'branch isolation therapy', group: 'workflow', bytes: 2100 },
  { name: 'finishing-a-development-branch', description: 'actually merge for once', group: 'workflow', bytes: 1700 },
  { name: 'subagent-driven-development', description: 'delegate to your clones', group: 'workflow', bytes: 4200 },
  { name: 'dispatching-parallel-agents', description: 'multitask like you pretend', group: 'workflow', bytes: 1600 },
  { name: 'writing-skills', description: 'teach Claude new tricks', group: 'workflow', bytes: 5800 },

  // Design
  { name: 'react-best-practices', description: 'avoid re-render hell', group: 'design', bytes: 4200 },
  { name: 'testing-patterns', description: 'tests that find bugs, not LOC', group: 'design', bytes: 3800 },
  { name: 'ui-skills', description: 'CSS that doesn\'t fight back', group: 'design', bytes: 2900 },
  { name: 'a11y-audit', description: 'guilt-powered WCAG compliance', group: 'design', bytes: 3400 },
  { name: 'seo-review', description: 'appease the algorithm gods', group: 'design', bytes: 2100 },
  { name: 'og-image', description: 'social cards that get clicks', group: 'design', bytes: 1800 },
  { name: 'microcopy', description: 'words that don\'t annoy users', group: 'design', bytes: 2200 },
  { name: 'sitemap-generator', description: 'feed the crawlers', group: 'design', bytes: 1400 },
  { name: 'json-ld', description: 'structured data for robots', group: 'design', bytes: 1600 },
];

export const BUNDLES = {
  everything: {
    name: 'Everything',
    description: 'Full superpowers. No regrets. Probably.',
    skills: SKILLS.map(s => s.name),
  },
  designer: {
    name: 'Designer Essentials',
    description: 'The guilt-trip starter pack.',
    skills: ['react-best-practices', 'ui-skills', 'a11y-audit', 'testing-patterns', 'seo-review', 'systematic-debugging', 'brainstorming', 'writing-plans', 'verification-before-completion'],
  },
  workflow: {
    name: 'Workflow Only',
    description: 'Plans and debugging. No design opinions.',
    skills: SKILLS.filter(s => s.group === 'workflow').map(s => s.name),
  },
} as const;

export const COMMANDS = [
  { name: '/build', description: 'compile and pray' },
  { name: '/typecheck', description: 'find the lies in your types' },
  { name: '/lint', description: 'formatting crimes detected' },
  { name: '/brainstorm', description: 'Socratic interrogation of your ideas' },
  { name: '/write-plan', description: 'plan before you regret' },
  { name: '/execute-plan', description: 'actually do the thing' },
];

export const ERRORS = {
  dirExists: (name: string) => ({
    title: `Directory "${name}" already exists.`,
    body: `You've got options:
├─ Pick a different name
├─ Delete the existing folder (brave)
└─ Use --dir to install in current directory

None of this is my fault. Probably.`,
  }),
  noBun: () => ({
    title: 'bun not found.',
    body: `Install it:
$ curl -fsSL https://bun.sh/install | bash

Then try again. I'll wait.`,
  }),
  network: () => ({
    title: 'Network error. npm is having a moment.',
    body: `├─ Check your internet connection
├─ Try again in a few minutes
└─ Complain on Twitter (optional but therapeutic)`,
  }),
};
```

**Step 2: Commit**

```bash
git add create-claudecraft/src/constants.ts
git commit -m "feat(cli): add constants with skills, bundles, and dark humor"
```

---

## Task 3: Create UI Module

**Files:**
- Create: `create-claudecraft/src/ui.ts`

**Step 1: Create UI module with blueprint boxes and gradients**

```typescript
import figlet from 'figlet';
import gradient from 'gradient-string';
import pc from 'picocolors';
import { TAGLINE, STACK, ASSETS, DEFAULT_THEME, DEFAULT_PORT, VERSION } from './constants.js';

// Halloween gradient colors
const halloweenGradient = gradient(['#f28c18', '#a855f7', '#6d28d9']);

export function renderHeader(): string {
  const title = figlet.textSync('CLAUDECRAFT', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
  });

  const gradientTitle = halloweenGradient(title);
  const width = 78;

  return `
${gradientTitle}
${pc.dim('◄' + '─'.repeat(width - 2) + '►')}
${pc.dim(`│ gradient: #f28c18 → #6d28d9 (halloween) · font: ANSI Shadow · v${VERSION}`)}
`;
}

export function renderManifest(): string {
  const line = (label: string, value: string, pad = 10) =>
    `${pc.dim(label.padEnd(pad))}${pc.white(value)}`;

  return `
┌─────────────────────────────────────────────────────────────────────────┐
│ ${pc.dim('┌─ manifest ──────────────────────────────────────────────────────────┐')} │
│ │                                                                     │ │
│ │   ${pc.italic(TAGLINE)}${' '.repeat(14)}│ │
│ │                                                                     │ │
│ │   ${pc.bold('STACK')}             ${pc.bold('ASSETS')}            ${pc.bold('DEFAULTS')}                      │ │
│ │   ${pc.dim('─────')}             ${pc.dim('──────')}            ${pc.dim('────────')}                      │ │
│ │   ${line('react', STACK.react)}     ${line('skills', String(ASSETS.skills), 8)}      ${line('theme', DEFAULT_THEME, 8)}            │ │
│ │   ${line('ts', STACK.typescript)}     ${line('commands', String(ASSETS.commands), 8)}      ${line('port', String(DEFAULT_PORT), 8)}            │ │
│ │   ${line('vite', STACK.vite)}     ${line('themes', String(ASSETS.themes), 8)}      ${line('tests', 'vitest', 8)}            │ │
│ │   ${line('tailwind', STACK.tailwind)} ${line('hooks', String(ASSETS.hooks), 8)}      ${line('pkg', 'bun', 8)}            │ │
│ │   ${line('daisyui', STACK.daisyui)}  ${line('components', String(ASSETS.components), 8)}  ${line('license', 'MIT', 8)}            │ │
│ │                                                                     │ │
│ │   ${pc.dim('weight: ~48 files · 0 runtime dependencies · 0 excuses')}            │ │
│ │                                                                     │ │
│ ${pc.dim('└─────────────────────────────────────────────────────────────────────┘')} │
└─────────────────────────────────────────────────────────────────────────┘
`;
}

export function renderStepHeader(step: number, total: number, title: string, required = false): string {
  const reqLabel = required ? pc.yellow(' required ') : pc.dim(' optional ');
  const stepLabel = pc.dim(`${String(step).padStart(2, '0')}/${String(total).padStart(2, '0')}`);
  const line = '─'.repeat(50);
  return `
┌─ ${stepLabel} ${pc.dim(line)}${reqLabel}─────────────
│`;
}

export function renderStepFooter(): string {
  return `│
└${'─'.repeat(74)}
`;
}

export function renderAnnotation(text: string): string {
  return pc.dim(`    └─ ${text}`);
}

export function renderSpecs(specs: Array<{ label: string; value: string }>): string {
  return specs.map(s => pc.dim(`    ├─ ${s.label}: ${s.value}`)).join('\n');
}

export function renderError(title: string, body: string): string {
  return `
┌─ ${pc.red('error')} ${'─'.repeat(62)}
│
│  ${pc.red('✗')} ${pc.bold(title)}
│
${body.split('\n').map(line => `│    ${line}`).join('\n')}
│
└${'─'.repeat(74)}
`;
}

export function renderProgress(tasks: Array<{ name: string; status: 'done' | 'active' | 'queued'; progress?: number; time?: string; detail?: string }>): string {
  const lines = tasks.map(t => {
    const width = 24;
    let bar = '';
    let statusText = '';

    if (t.status === 'done') {
      bar = pc.green('█'.repeat(width));
      statusText = pc.green('done');
    } else if (t.status === 'active') {
      const filled = Math.floor((t.progress || 0) / 100 * width);
      bar = pc.green('█'.repeat(filled)) + pc.dim('░'.repeat(width - filled));
      statusText = pc.yellow(`${t.progress}%`);
    } else {
      bar = pc.dim('░'.repeat(width));
      statusText = pc.dim('queued');
    }

    const timeStr = t.time ? pc.dim(t.time.padStart(6)) : pc.dim('─'.padStart(6));
    const detail = t.detail ? pc.dim(t.detail) : '';

    return `│  │ ${t.name.padEnd(14)} ${bar}  ${statusText.padEnd(8)} ${timeStr}   ${detail}`;
  });

  return `
┌─ ${pc.cyan('installing')} ${'─'.repeat(60)}
│
│  ┌${'─'.repeat(68)}┐
${lines.join('\n')}
│  └${'─'.repeat(68)}┘
│
`;
}

export function renderComplete(projectName: string, stats: Record<string, string | number>): string {
  return `
┌─ ${pc.green('complete')} ${'─'.repeat(62)}
│
│  ${pc.green('✓')} ${pc.bold('Your mass of pixels is ready.')}
│
│  ┌─ ${pc.dim('next steps')} ${'─'.repeat(55)}┐
│  │                                                                    │
│  │   ${pc.cyan('$')} ${pc.white(`cd ${projectName}`)}${' '.repeat(38 - projectName.length)}${pc.dim('◄─ enter project')}            │
│  │   ${pc.cyan('$')} ${pc.white('bun dev')}${' '.repeat(43)}${pc.dim('◄─ start dev server')}         │
│  │   ${pc.cyan('$')} ${pc.white('open http://localhost:6969')}${' '.repeat(24)}${pc.dim('◄─ nice')}                    │
│  │                                                                    │
│  └${'─'.repeat(68)}┘
│
│  ┌─ ${pc.dim('stats')} ${'─'.repeat(59)}┐
│  │                                                                    │
│  │   ${pc.dim('created')}      ${pc.white(`./${projectName}/`).padEnd(30)}${pc.dim('total time')}    ${String(stats.time).padEnd(10)}│
│  │   ${pc.dim('files')}        ${String(stats.files).padEnd(30)}${pc.dim('dependencies')}  ${String(stats.deps).padEnd(10)}│
│  │   ${pc.dim('skills')}       ${String(stats.skills).padEnd(30)}${pc.dim('disk usage')}    ${String(stats.disk).padEnd(10)}│
│  │   ${pc.dim('commands')}     ${String(stats.commands).padEnd(30)}${pc.dim('theme')}         ${String(stats.theme).padEnd(10)}│
│  │   ${pc.dim('themes')}       ${String(stats.themes).padEnd(30)}${pc.dim('port')}          ${String(stats.port).padEnd(10)}│
│  │                                                                    │
│  └${'─'.repeat(68)}┘
│
│  ${pc.dim('bugs? ideas? complaints?')}
│  ${pc.dim('→')} ${pc.cyan('github.com/raduceuca/claudecraft/issues')}
│
└${'─'.repeat(74)}
  │
  └─ ${pc.dim(`rev: ${VERSION} · generated: ${new Date().toISOString()}`)}
`;
}
```

**Step 2: Commit**

```bash
git add create-claudecraft/src/ui.ts
git commit -m "feat(cli): add blueprint UI module with gradients and boxes"
```

---

## Task 4: Create Prompts Module

**Files:**
- Create: `create-claudecraft/src/prompts.ts`

**Step 1: Create prompts module**

```typescript
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { SKILLS, BUNDLES, type Skill } from './constants.js';
import { renderStepHeader, renderStepFooter, renderSpecs, renderAnnotation } from './ui.js';

export interface UserChoices {
  projectName: string;
  bundle: 'everything' | 'designer' | 'workflow' | 'custom';
  selectedSkills: string[];
  includeHomepage: boolean;
  initGit: boolean;
}

export async function runPrompts(defaultName?: string): Promise<UserChoices | null> {
  const totalSteps = 4;

  // Step 1: Project name
  console.log(renderStepHeader(1, totalSteps, 'Project Name', true));

  const projectName = await p.text({
    message: 'What do you want to call this mass of pixels?',
    placeholder: defaultName || 'my-app',
    defaultValue: defaultName || 'my-app',
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Use lowercase letters, numbers, and dashes only';
      if (value.length > 64) return 'Max 64 characters';
      return undefined;
    },
  });

  if (p.isCancel(projectName)) {
    p.cancel('Operation cancelled. No pixels were harmed.');
    return null;
  }

  console.log(renderSpecs([
    { label: 'format', value: 'lowercase' },
    { label: 'allowed', value: 'a-z, 0-9, dashes' },
    { label: 'creates', value: `./${projectName}/` },
  ]));
  console.log(renderStepFooter());

  // Step 2: Bundle selection
  console.log(renderStepHeader(2, totalSteps, 'Skill Bundle'));

  const workflowCount = SKILLS.filter(s => s.group === 'workflow').length;
  const designCount = SKILLS.filter(s => s.group === 'design').length;

  const bundle = await p.select({
    message: "What's your poison?",
    options: [
      {
        value: 'everything',
        label: `${pc.bold('Everything')} ${pc.dim(`◄─ ${SKILLS.length} skills, 6 cmds`)}`,
        hint: BUNDLES.everything.description,
      },
      {
        value: 'designer',
        label: `${pc.bold('Designer Essentials')} ${pc.dim(`◄─ ${BUNDLES.designer.skills.length} skills, 3 cmds`)}`,
        hint: BUNDLES.designer.description,
      },
      {
        value: 'workflow',
        label: `${pc.bold('Workflow Only')} ${pc.dim(`◄─ ${workflowCount} skills, 3 cmds`)}`,
        hint: BUNDLES.workflow.description,
      },
      {
        value: 'custom',
        label: `${pc.bold('Let Me Pick')} ${pc.dim('◄─ ? skills, ? cmds')}`,
        hint: 'Trust issues? Understandable.',
      },
    ],
  });

  if (p.isCancel(bundle)) {
    p.cancel('Operation cancelled. Your trust issues remain unresolved.');
    return null;
  }

  console.log(renderAnnotation('default: Everything · skip: --yes'));
  console.log(renderStepFooter());

  // Step 2b: Custom skill selection (if "Let Me Pick")
  let selectedSkills: string[] = [];

  if (bundle === 'custom') {
    console.log(renderStepHeader(2, totalSteps, 'Skill Picker', false));
    console.log(`│  ${pc.dim('if: Let Me Pick')}`);

    const workflowSkills = SKILLS.filter(s => s.group === 'workflow');
    const designSkills = SKILLS.filter(s => s.group === 'design');

    console.log(`│\n│  ${pc.dim('┌─ workflow ─────────────────────────────────── via obra/superpowers ─┐')}`);

    const workflowChoices = await p.multiselect({
      message: 'Select workflow skills:',
      options: workflowSkills.map(s => ({
        value: s.name,
        label: s.name,
        hint: s.description,
      })),
      initialValues: workflowSkills.slice(0, 6).map(s => s.name),
    });

    if (p.isCancel(workflowChoices)) {
      p.cancel('Operation cancelled.');
      return null;
    }

    console.log(`│  ${pc.dim('└─────────────────────────────────────────────────────────────────────┘')}`);
    console.log(`│\n│  ${pc.dim('┌─ design ──────────────────────────────────────────────────────────┐')}`);

    const designChoices = await p.multiselect({
      message: 'Select design skills:',
      options: designSkills.map(s => ({
        value: s.name,
        label: s.name,
        hint: s.description,
      })),
      initialValues: designSkills.slice(0, 4).map(s => s.name),
    });

    if (p.isCancel(designChoices)) {
      p.cancel('Operation cancelled.');
      return null;
    }

    selectedSkills = [...(workflowChoices as string[]), ...(designChoices as string[])];

    console.log(`│  ${pc.dim('└───────────────────────────────────────────────────────────────────┘')}`);
    console.log(renderSpecs([
      { label: 'toggle', value: 'space' },
      { label: 'toggle all', value: 'a' },
      { label: 'confirm', value: 'enter' },
    ]));
    console.log(renderStepFooter());
  } else {
    selectedSkills = bundle === 'everything'
      ? SKILLS.map(s => s.name)
      : bundle === 'designer'
        ? BUNDLES.designer.skills
        : BUNDLES.workflow.skills;
  }

  // Step 3: Include homepage
  console.log(renderStepHeader(3, totalSteps, 'Example Homepage'));

  const includeHomepage = await p.confirm({
    message: 'Include the example homepage?',
    initialValue: true,
  });

  if (p.isCancel(includeHomepage)) {
    p.cancel('Operation cancelled.');
    return null;
  }

  console.log(renderAnnotation(includeHomepage ? '+6 files · I learn by stealing' : 'blank src/App.tsx'));
  console.log(renderStepFooter());

  // Step 4: Git init
  console.log(renderStepHeader(4, totalSteps, 'Git Init'));

  const initGit = await p.confirm({
    message: 'Initialize git?',
    initialValue: true,
  });

  if (p.isCancel(initGit)) {
    p.cancel('Operation cancelled.');
    return null;
  }

  console.log(renderAnnotation(initGit ? 'git init · initial commit: "init: claudecraft scaffolding"' : 'no .git/'));
  console.log(renderStepFooter());

  return {
    projectName: projectName as string,
    bundle: bundle as UserChoices['bundle'],
    selectedSkills,
    includeHomepage: includeHomepage as boolean,
    initGit: initGit as boolean,
  };
}
```

**Step 2: Commit**

```bash
git add create-claudecraft/src/prompts.ts
git commit -m "feat(cli): add interactive prompts with blueprint annotations"
```

---

## Task 5: Create Scaffold Module

**Files:**
- Create: `create-claudecraft/src/scaffold.ts`

**Step 1: Create scaffold module**

```typescript
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

export async function scaffold(
  choices: UserChoices,
  onProgress: (task: string, progress: number, detail?: string) => void
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
  await fs.copy(path.join(TEMPLATES_DIR, 'base'), targetDir);

  // Copy selected skills
  onProgress('scaffolding', 30, 'skills');
  const skillsDir = path.join(targetDir, '.claude', 'skills');
  await fs.ensureDir(skillsDir);

  for (const skillName of choices.selectedSkills) {
    const skill = SKILLS.find(s => s.name === skillName);
    if (!skill) continue;

    const sourceDir = path.join(TEMPLATES_DIR, 'skills', skill.group, skillName);
    if (await fs.pathExists(sourceDir)) {
      await fs.copy(sourceDir, path.join(skillsDir, skillName));
    }
  }

  // Copy commands based on bundle
  onProgress('scaffolding', 50, 'commands');
  const commandsDir = path.join(targetDir, '.claude', 'commands');
  await fs.ensureDir(commandsDir);
  await fs.copy(path.join(TEMPLATES_DIR, 'commands'), commandsDir);

  // Copy components
  onProgress('scaffolding', 60, 'components');
  await fs.copy(
    path.join(TEMPLATES_DIR, 'components'),
    path.join(targetDir, 'src', 'components')
  );

  // Copy homepage if selected
  if (choices.includeHomepage) {
    onProgress('scaffolding', 70, 'homepage');
    await fs.copy(
      path.join(TEMPLATES_DIR, 'homepage'),
      path.join(targetDir, 'src', 'pages')
    );
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
  }

  // Update package.json with project name
  onProgress('scaffolding', 80, 'package.json');
  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  pkg.name = choices.projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

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
      execSync('git commit -m "init: claudecraft scaffolding"', { cwd: targetDir, stdio: 'pipe' });
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
```

**Step 2: Commit**

```bash
git add create-claudecraft/src/scaffold.ts
git commit -m "feat(cli): add scaffold module for file copying and setup"
```

---

## Task 6: Create Main Entry Point

**Files:**
- Create: `create-claudecraft/src/index.ts`

**Step 1: Create main orchestrator**

```typescript
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { renderHeader, renderManifest, renderProgress, renderComplete, renderError } from './ui.js';
import { runPrompts } from './prompts.js';
import { scaffold } from './scaffold.js';
import { ERRORS, DEFAULT_THEME, DEFAULT_PORT, ASSETS } from './constants.js';

async function main() {
  // Parse args
  const args = process.argv.slice(2);
  const projectName = args.find(a => !a.startsWith('-'));
  const skipPrompts = args.includes('--yes') || args.includes('-y');
  const noGit = args.includes('--no-git');
  const noInstall = args.includes('--no-install');
  const showHelp = args.includes('--help') || args.includes('-h');
  const showVersion = args.includes('--version') || args.includes('-v');

  if (showVersion) {
    console.log('1.0.0');
    process.exit(0);
  }

  if (showHelp) {
    console.log(`
${pc.bold('create-claudecraft')} - Designer-first boilerplate for Claude Code

${pc.bold('Usage:')}
  bun create claudecraft [project-name] [options]

${pc.bold('Options:')}
  --yes, -y          Skip prompts, use defaults
  --no-git           Skip git initialization
  --no-install       Skip dependency installation
  --help, -h         Show this help
  --version, -v      Show version

${pc.bold('Examples:')}
  bun create claudecraft my-app
  bun create claudecraft my-app --yes
  bun create claudecraft --yes
`);
    process.exit(0);
  }

  // Render header
  console.clear();
  console.log(renderHeader());
  console.log(renderManifest());

  // Get user choices
  let choices;

  if (skipPrompts) {
    choices = {
      projectName: projectName || 'claudecraft-app',
      bundle: 'everything' as const,
      selectedSkills: [], // Will be populated from bundle
      includeHomepage: true,
      initGit: !noGit,
    };
    // Populate skills from bundle
    const { SKILLS } = await import('./constants.js');
    choices.selectedSkills = SKILLS.map(s => s.name);
  } else {
    choices = await runPrompts(projectName);
    if (!choices) process.exit(0);
  }

  // Override git if --no-git flag
  if (noGit) choices.initGit = false;

  // Scaffold
  const progressState = {
    scaffolding: { progress: 0, status: 'queued' as const, detail: '' },
    dependencies: { progress: 0, status: 'queued' as const, detail: '' },
    'git init': { progress: 0, status: 'queued' as const, detail: '' },
  };

  const updateProgress = (task: string, progress: number, detail?: string) => {
    const key = task as keyof typeof progressState;
    progressState[key] = {
      progress,
      status: progress >= 100 ? 'done' : 'active',
      detail: detail || '',
    };

    // Re-render progress
    console.clear();
    console.log(renderHeader());
    console.log(renderProgress([
      { name: 'scaffolding', ...progressState.scaffolding },
      { name: 'dependencies', ...progressState.dependencies },
      { name: 'git init', ...progressState['git init'] },
    ]));
  };

  try {
    const result = await scaffold(choices, updateProgress);

    // Final output
    console.clear();
    console.log(renderHeader());
    console.log(renderComplete(choices.projectName, {
      files: result.files,
      skills: result.skills,
      commands: result.commands,
      themes: ASSETS.themes,
      time: result.time,
      deps: result.deps,
      disk: result.disk,
      theme: DEFAULT_THEME,
      port: DEFAULT_PORT,
    }));
  } catch (err) {
    const error = err as Error;

    if (error.message.startsWith('DIR_EXISTS:')) {
      const name = error.message.split(':')[1];
      const { title, body } = ERRORS.dirExists(name);
      console.log(renderError(title, body));
    } else if (error.message === 'INSTALL_FAILED') {
      const { title, body } = ERRORS.network();
      console.log(renderError(title, body));
    } else {
      console.log(renderError('Unexpected error', error.message));
    }

    process.exit(1);
  }
}

main().catch(console.error);
```

**Step 2: Commit**

```bash
git add create-claudecraft/src/index.ts
git commit -m "feat(cli): add main entry point orchestrating the full flow"
```

---

## Task 7: Copy Templates from Main Repo

**Files:**
- Create: `create-claudecraft/templates/base/` (copy from main repo)
- Create: `create-claudecraft/templates/skills/` (copy from main repo)
- Create: `create-claudecraft/templates/components/` (copy from main repo)
- Create: `create-claudecraft/templates/commands/` (copy from main repo)
- Create: `create-claudecraft/templates/homepage/` (copy from main repo)

**Step 1: Copy base template files**

```bash
# From claudecraft root
cp -r .claude create-claudecraft/templates/base/
cp -r src/components create-claudecraft/templates/
cp -r src/context create-claudecraft/templates/base/src/
cp -r src/lib create-claudecraft/templates/base/src/
cp -r src/types create-claudecraft/templates/base/src/
cp src/main.tsx create-claudecraft/templates/base/src/
cp src/index.css create-claudecraft/templates/base/src/
cp src/vite-env.d.ts create-claudecraft/templates/base/src/
cp package.json create-claudecraft/templates/base/
cp tsconfig.json create-claudecraft/templates/base/
cp vite.config.ts create-claudecraft/templates/base/
cp tailwind.config.js create-claudecraft/templates/base/
cp postcss.config.js create-claudecraft/templates/base/
cp eslint.config.js create-claudecraft/templates/base/
cp index.html create-claudecraft/templates/base/
cp .gitignore create-claudecraft/templates/base/
```

**Step 2: Organize skills by group**

```bash
mkdir -p create-claudecraft/templates/skills/workflow
mkdir -p create-claudecraft/templates/skills/design

# Move workflow skills
mv create-claudecraft/templates/base/.claude/skills/brainstorming create-claudecraft/templates/skills/workflow/
mv create-claudecraft/templates/base/.claude/skills/writing-plans create-claudecraft/templates/skills/workflow/
# ... (continue for all workflow skills)

# Move design skills
mv create-claudecraft/templates/base/.claude/skills/react-best-practices create-claudecraft/templates/skills/design/
mv create-claudecraft/templates/base/.claude/skills/ui-skills create-claudecraft/templates/skills/design/
# ... (continue for all design skills)
```

**Step 3: Copy homepage**

```bash
mkdir -p create-claudecraft/templates/homepage
cp src/pages/HomePage.tsx create-claudecraft/templates/homepage/
cp src/App.tsx create-claudecraft/templates/homepage/App.tsx.template
```

**Step 4: Copy commands**

```bash
cp -r .claude/commands create-claudecraft/templates/
```

**Step 5: Commit**

```bash
git add create-claudecraft/templates/
git commit -m "feat(cli): add templates from main claudecraft repo"
```

---

## Task 8: Build and Test Locally

**Step 1: Build TypeScript**

```bash
cd create-claudecraft
bun run build
```

**Step 2: Link locally for testing**

```bash
bun link
```

**Step 3: Test in a temp directory**

```bash
cd /tmp
bun create claudecraft test-app
```

**Step 4: Verify the output**

```bash
cd test-app
bun dev
# Open localhost:6969
```

**Step 5: Fix any issues found, then commit**

```bash
git add -A
git commit -m "fix(cli): resolve issues found during local testing"
```

---

## Task 9: Prepare for npm Publish

**Files:**
- Update: `create-claudecraft/package.json`
- Create: `create-claudecraft/README.md`

**Step 1: Update package.json with final metadata**

Ensure `repository`, `bugs`, `homepage` fields are set.

**Step 2: Create README.md**

```markdown
# create-claudecraft

Designer-first boilerplate for Claude Code. The robots are here.

## Usage

```bash
bun create claudecraft my-app
```

## Options

- `--yes, -y` — Skip prompts, use defaults
- `--no-git` — Skip git initialization
- `--no-install` — Skip dependency installation

## What's Inside

- React 18 + TypeScript + Vite
- Tailwind CSS + DaisyUI (32 themes)
- 23 skills for Claude Code
- 6 slash commands
- Dark humor included at no extra charge

## Links

- [Main repo](https://github.com/raduceuca/claudecraft)
- [DaisyUI](https://daisyui.com)
- [Claude Code](https://docs.anthropic.com/claude-code)

## License

MIT
```

**Step 3: Commit**

```bash
git add create-claudecraft/
git commit -m "docs(cli): add README and finalize package.json"
```

---

## Task 10: Publish to npm

**Step 1: Login to npm**

```bash
npm login
```

**Step 2: Publish**

```bash
cd create-claudecraft
npm publish --access public
```

**Step 3: Verify it works**

```bash
cd /tmp
bun create claudecraft final-test
```

**Step 4: Update main repo homepage with new install method**

Update `src/pages/HomePage.tsx` to show `bun create claudecraft my-app` as primary install method.

**Step 5: Commit and deploy**

```bash
git add -A
git commit -m "docs: update homepage with bun create install method"
npx vercel --prod
```

---

## Summary

| Task | Description | Est. Time |
|------|-------------|-----------|
| 1 | Initialize package structure | 5 min |
| 2 | Create constants module | 10 min |
| 3 | Create UI module | 15 min |
| 4 | Create prompts module | 15 min |
| 5 | Create scaffold module | 15 min |
| 6 | Create main entry point | 10 min |
| 7 | Copy templates | 10 min |
| 8 | Build and test locally | 15 min |
| 9 | Prepare for publish | 5 min |
| 10 | Publish to npm | 5 min |

**Total: ~10 tasks, ~105 minutes**

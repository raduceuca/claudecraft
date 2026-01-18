import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import {
  renderHeader,
  renderManifest,
  renderMiniHeader,
  renderProgress,
  renderProgressFooter,
  renderComplete,
  renderError,
  renderInitComplete,
  type ProgressTask,
} from './ui.js';
import { runInkPrompts, runInkInitPrompts, type UserChoices, type InitChoices } from './ink-prompts.js';
import { scaffold, initExisting } from './scaffold.js';
import { ERRORS, DEFAULT_THEME, DEFAULT_PORT, ASSETS, SKILLS, VERSION } from './constants.js';

async function main() {
  // Parse args
  const args = process.argv.slice(2);
  const projectName = args.find((a) => !a.startsWith('-'));
  const skipPrompts = args.includes('--yes') || args.includes('-y');
  const noGit = args.includes('--no-git');
  const noInstall = args.includes('--no-install');
  const showHelp = args.includes('--help') || args.includes('-h') || args.includes('/help');
  const showVersion = args.includes('--version') || args.includes('-v') || args.includes('/version');
  const initMode = args.includes('--init') || args.includes('-i') || args.includes('/init');

  if (showVersion) {
    console.log(VERSION);
    process.exit(0);
  }

  if (showHelp) {
    console.log(`
${pc.bold('create-claudecraft')} - Designer-first boilerplate for Claude Code

${pc.bold('Usage:')}
  bun create claudecraft [project-name] [options]

${pc.bold('Options:')}
  --yes, -y          Skip prompts, use defaults
  --init, -i         Add skills to existing project (no scaffold)
  --no-git           Skip git initialization
  --no-install       Skip dependency installation
  --help, -h         Show this help
  --version, -v      Show version

${pc.bold('Slash Commands:')}
  /help              Same as --help
  /init              Same as --init
  /version           Same as --version

${pc.bold('Examples:')}
  ${pc.dim('# New project')}
  bun create claudecraft my-app
  bun create claudecraft my-app --yes

  ${pc.dim('# Existing project (run from project root)')}
  bunx create-claudecraft --init
  bunx create-claudecraft --init --yes

${pc.bold('Figma Integration:')}
  After setup, connect Figma MCP:
  claude mcp add --transport http figma https://mcp.figma.com/mcp
`);
    process.exit(0);
  }

  // Init mode: add to existing project
  if (initMode) {
    await runInitMode(skipPrompts);
    return;
  }

  // Get user choices
  let choices: UserChoices;

  if (skipPrompts) {
    // Show header only for non-interactive mode
    console.clear();
    console.log(renderHeader());
    console.log(renderManifest());
    choices = {
      projectName: projectName || 'claudecraft-app',
      bundle: 'everything' as const,
      selectedSkills: SKILLS.map((s) => s.name),
      includeHomepage: true,
      initGit: !noGit,
    };

    console.log(pc.dim(`  Using defaults: ${choices.projectName}, all skills, homepage, git init`));
    console.log('');
  } else {
    const result = await runInkPrompts(projectName);
    if (!result) process.exit(0);
    choices = result;
  }

  // Override git if --no-git flag
  if (noGit) choices.initGit = false;

  // Progress state
  const progressState: Record<string, ProgressTask> = {
    scaffolding: { name: 'scaffolding', progress: 0, status: 'queued', detail: '' },
    dependencies: { name: 'dependencies', progress: 0, status: 'queued', detail: '' },
    'git init': { name: 'git init', progress: 0, status: 'queued', detail: '' },
  };

  let startTime = Date.now();

  const updateProgress = (task: string, progress: number, detail?: string) => {
    progressState[task] = {
      name: task,
      progress,
      status: progress >= 100 ? 'done' : 'active',
      time: progress >= 100 ? `${((Date.now() - startTime) / 1000).toFixed(1)}s` : undefined,
      detail: detail || '',
    };

    // Mark previous tasks as done
    const tasks = Object.keys(progressState);
    const currentIndex = tasks.indexOf(task);
    for (let i = 0; i < currentIndex; i++) {
      if (progressState[tasks[i]].status !== 'done') {
        progressState[tasks[i]].status = 'done';
        progressState[tasks[i]].progress = 100;
      }
    }

    // Re-render progress
    console.clear();
    console.log(renderMiniHeader());
    console.log('');
    console.log(
      renderProgress([
        progressState['scaffolding'],
        progressState['dependencies'],
        progressState['git init'],
      ])
    );

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(renderProgressFooter(`${elapsed}s`, ''));
  };

  try {
    startTime = Date.now();
    const result = await scaffold(choices, updateProgress);

    // Final output
    console.clear();
    console.log(renderMiniHeader());
    console.log(
      renderComplete(choices.projectName, {
        files: result.files,
        skills: result.skills,
        commands: result.commands,
        themes: ASSETS.themes,
        time: result.time,
        deps: result.deps,
        disk: result.disk,
        theme: DEFAULT_THEME,
        port: DEFAULT_PORT,
      })
    );
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

async function runInitMode(skipPrompts: boolean) {
  // Check if we're in a project directory
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    const { title, body } = ERRORS.noProject();
    console.log(renderError(title, body));
    process.exit(1);
  }

  // Check if .claude already exists
  const claudeDir = path.join(cwd, '.claude');
  const alreadyInit = fs.existsSync(claudeDir);

  // Show warning if .claude already exists (for --yes mode)
  if (alreadyInit && skipPrompts) {
    console.log(pc.yellow('  ⚠ .claude/ exists - will merge, not overwrite'));
  }

  // Get choices
  let choices: InitChoices;

  if (skipPrompts) {
    choices = {
      selectedSkills: SKILLS.map((s) => s.name),
    };
    console.log(pc.dim(`  Using defaults: all ${SKILLS.length} skills`));
    console.log('');
  } else {
    const result = await runInkInitPrompts();
    if (!result) process.exit(0);
    choices = result;
  }

  // Progress state (simpler for init)
  const progressState: Record<string, ProgressTask> = {
    scaffolding: { name: 'scaffolding', progress: 0, status: 'queued', detail: '' },
  };

  let startTime = Date.now();

  const updateProgress = (task: string, progress: number, detail?: string) => {
    progressState[task] = {
      name: task,
      progress,
      status: progress >= 100 ? 'done' : 'active',
      time: progress >= 100 ? `${((Date.now() - startTime) / 1000).toFixed(1)}s` : undefined,
      detail: detail || '',
    };

    console.clear();
    console.log(renderMiniHeader());
    console.log('');
    console.log(renderProgress([progressState['scaffolding']]));

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(renderProgressFooter(`${elapsed}s`, ''));
  };

  try {
    startTime = Date.now();
    const result = await initExisting(choices, updateProgress);

    // Final output
    console.clear();
    console.log(renderMiniHeader());
    console.log(
      renderInitComplete({
        files: result.files,
        skills: result.skills,
        commands: result.commands,
        time: result.time,
      })
    );
  } catch (err) {
    const error = err as Error;
    console.log(renderError('Init failed', error.message));
    process.exit(1);
  }
}

main().catch(console.error);

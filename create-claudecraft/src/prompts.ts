import * as p from '@clack/prompts';
import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import { SKILLS, BUNDLES, COMMANDS } from './constants.js';
import { renderMiniHeader } from './ui.js';

// Interactive slash commands available during prompts
function showInteractiveHelp(): void {
  const existentialBits = [
    "You're not being replaced. You're being... augmented. Involuntarily.",
    "The AI can't feel impostor syndrome. That's still your job.",
    "Remember when 'prompt engineering' wasn't a career? Good times.",
    "The robots write code now. You write prompts. This is fine.",
    "Your design degree prepared you for this. (It didn't.)",
    "At least the AI doesn't have opinions about your font choices. Yet.",
    "You're not obsolete. You're a 'human-in-the-loop'. Very important loop.",
    "The future is AI-assisted. Your anxiety is fully organic.",
    "Figma + AI + You = Still confused, but faster.",
    "Don't worry. The AI hallucinates too. You have that in common.",
  ];
  const randomBit = existentialBits[Math.floor(Math.random() * existentialBits.length)];

  const reassurance = [
    "But hey, someone still needs taste. That's you. Allegedly.",
    "Breathe. The AI still can't center a div without help.",
    "You're here because clients still need someone to blame.",
    "Keep going. The AI believes in you. (It doesn't. It can't.)",
    "This too shall ship. Eventually. Maybe.",
  ];
  const randomReassurance = reassurance[Math.floor(Math.random() * reassurance.length)];

  console.log('');
  console.log(pc.dim('  ╭─── HELP ─────────────────────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} ${pc.dim(randomBit)}`);
  console.log(pc.dim('  ├─── COMMANDS ────────────────────────────────────────────────────────┤'));
  console.log(`  ${pc.dim('│')} ${pc.cyan('/help')}       ${pc.dim('you are here (existentially, too)')}`);
  console.log(`  ${pc.dim('│')} ${pc.cyan('/skills')}     ${pc.dim('see what the robots learned')}`);
  console.log(`  ${pc.dim('│')} ${pc.cyan('/quit')}       ${pc.dim('rage quit (Ctrl+C also works)')}`);
  console.log(pc.dim('  ├─── NAVIGATION ─────────────────────────────────────────────────────┤'));
  console.log(`  ${pc.dim('│')} ${pc.dim('↑↓')}          ${pc.dim('move through options')}`);
  console.log(`  ${pc.dim('│')} ${pc.dim('space')}       ${pc.dim('toggle selection')}`);
  console.log(`  ${pc.dim('│')} ${pc.dim('enter')}       ${pc.dim('confirm your life choices')}`);
  console.log(`  ${pc.dim('│')} ${pc.dim('esc')}         ${pc.dim('cancel (the project, not your career)')}`);
  console.log(pc.dim('  ├─── REASSURANCE ────────────────────────────────────────────────────┤'));
  console.log(`  ${pc.dim('│')} ${pc.dim(randomReassurance)}`);
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));
  console.log('');
}

function showSkillsList(): void {
  const headers = [
    "Things the AI learned so you don't have to:",
    "Skills acquired through mass data consumption:",
    "What the robots know (spoiler: a lot):",
    "Your competition's new skill tree:",
    "Capabilities that took humans years to learn:",
  ];
  const randomHeader = headers[Math.floor(Math.random() * headers.length)];

  const footers = [
    "Total skills: " + SKILLS.length + ". Total human obsolescence: pending.",
    "That's " + SKILLS.length + " things you can delegate to the void.",
    SKILLS.length + " skills. 0 benefits. ∞ existential questions.",
    "The AI learned all this in mass. You're still on this prompt.",
  ];
  const randomFooter = footers[Math.floor(Math.random() * footers.length)];

  console.log('');
  console.log(pc.dim('  ╭─── SKILLS ─────────────────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} ${pc.dim(randomHeader)}`);
  console.log(pc.dim('  ├─── WORKFLOW ────────────────────────────────────────────────────────┤'));
  SKILLS.filter(s => s.group === 'workflow').forEach(s => {
    console.log(`  ${pc.dim('│')}   ${s.name.padEnd(26)} ${pc.dim(s.description)}`);
  });
  console.log(pc.dim('  ├─── DESIGN ─────────────────────────────────────────────────────────┤'));
  SKILLS.filter(s => s.group === 'design').forEach(s => {
    console.log(`  ${pc.dim('│')}   ${s.name.padEnd(26)} ${pc.dim(s.description)}`);
  });
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));
  console.log(`  ${pc.dim('│')} ${pc.dim(randomFooter)}`);
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));
  console.log('');
}

// Show autocomplete suggestions
function showCommandSuggestions(): void {
  console.log('');
  console.log(pc.dim('  ╭─── / ────────────────────────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} ${pc.cyan('/help')}     ${pc.dim('existential guidance')}`);
  console.log(`  ${pc.dim('│')} ${pc.cyan('/skills')}   ${pc.dim('what the AI knows')}`);
  console.log(`  ${pc.dim('│')} ${pc.cyan('/quit')}     ${pc.dim('escape while you can')}`);
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));
  console.log('');
}

// Check if input is a slash command, handle it, return true if handled
function handleSlashCommand(value: string): boolean {
  const cmd = value.trim().toLowerCase();

  // Just "/" shows autocomplete suggestions
  if (cmd === '/') {
    showCommandSuggestions();
    return true;
  }

  if (cmd === '/help' || cmd === '/h' || cmd === '/?') {
    showInteractiveHelp();
    return true;
  }

  if (cmd === '/skills' || cmd === '/list') {
    showSkillsList();
    return true;
  }

  if (cmd === '/quit' || cmd === '/exit' || cmd === '/q') {
    p.cancel("You'll be back. They always come back.");
    process.exit(0);
  }

  // Partial match suggestions
  if (cmd.startsWith('/')) {
    const available = ['/help', '/skills', '/quit'];
    const matches = available.filter(c => c.startsWith(cmd));

    if (matches.length > 0 && matches.length < available.length) {
      console.log(pc.dim(`  Did you mean: ${matches.join(', ')}?`));
    } else {
      console.log(pc.dim(`  Unknown command: ${cmd}. Try /help`));
    }
    return true;
  }

  return false;
}

export interface UserChoices {
  projectName: string;
  bundle: 'everything' | 'designer' | 'workflow' | 'custom';
  selectedSkills: string[];
  includeHomepage: boolean;
  initGit: boolean;
}

export interface InitChoices {
  selectedSkills: string[];
}

export async function runPrompts(defaultName?: string): Promise<UserChoices | null> {
  const totalSteps = 4;
  const workflowCount = SKILLS.filter((s) => s.group === 'workflow').length;

  // Step 1: Project name
  // Don't clear - let intro screen stay visible for first step
  console.log('');
  console.log(pc.dim('  ╭─── [1/4] PROJECT NAME ──────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} What are we calling this?  ${pc.dim('lowercase · numbers · dashes · /help')}`);
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

  let projectName: string | symbol;
  while (true) {
    projectName = await p.text({
      message: '',
      placeholder: defaultName || 'my-app',
      defaultValue: defaultName,
      validate: (value) => {
        // Allow slash commands through validation
        if (value.startsWith('/')) return undefined;
        if (!value) return 'Required';
        if (!/^[a-z0-9-]+$/.test(value)) return 'Lowercase, numbers, dashes only';
        if (value.length > 64) return 'Max 64 chars';
        const targetDir = path.resolve(process.cwd(), value);
        if (fs.existsSync(targetDir)) return `Directory "${value}" already exists`;
        return undefined;
      },
    });

    if (p.isCancel(projectName)) {
      p.cancel("You'll be back. They always come back.");
      return null;
    }

    // Handle slash commands
    if (typeof projectName === 'string' && handleSlashCommand(projectName)) {
      continue; // Re-prompt after showing command output
    }

    break; // Valid input, continue
  }
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

  // Step 2: Bundle selection
  console.clear();
  console.log(renderMiniHeader());
  console.log('');
  console.log(pc.dim('  ╭─── [2/4] SKILL BUNDLE ──────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} How much help do you want?`);
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));
  console.log(pc.dim(`  │  everything  ${SKILLS.length} skills, 6 cmds   workflow  ${workflowCount} skills, 3 cmds`));
  console.log(pc.dim(`  │  designer    ${BUNDLES.designer.skills.length} skills, 3 cmds   custom    you pick`));
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

  const bundle = await p.select({
    message: '',
    options: [
      {
        value: 'everything',
        label: `${pc.bold('Everything')}`,
        hint: `${BUNDLES.everything.description} · ${SKILLS.length} skills`,
      },
      {
        value: 'designer',
        label: `${pc.bold('Designer Essentials')}`,
        hint: `${BUNDLES.designer.description} · ${BUNDLES.designer.skills.length} skills`,
      },
      {
        value: 'workflow',
        label: `${pc.bold('Workflow Only')}`,
        hint: `${BUNDLES.workflow.description} · ${workflowCount} skills`,
      },
      {
        value: 'custom',
        label: `${pc.bold('Let Me Pick')}`,
        hint: 'Control freak? Respect.',
      },
    ],
  });

  if (p.isCancel(bundle)) {
    p.cancel("You'll be back. They always come back.");
    return null;
  }
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

  // Step 2b: Custom skill selection (if "Let Me Pick")
  let selectedSkills: string[] = [];

  if (bundle === 'custom') {
    const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
    const designSkills = SKILLS.filter((s) => s.group === 'design');

    // Workflow skills
    console.clear();
    console.log(renderMiniHeader());
    console.log('');
    console.log(pc.dim('  ╭─── [2/4] WORKFLOW SKILLS ───────────────────────────────────────────╮'));
    console.log(`  ${pc.dim('│')} Select workflow skills  ${pc.dim('space: toggle · a: all · enter: confirm')}`);
    console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

    const workflowChoices = await p.multiselect({
      message: '',
      options: workflowSkills.map((s) => ({
        value: s.name,
        label: s.name.padEnd(28),
        hint: s.description,
      })),
      initialValues: workflowSkills.slice(0, 6).map((s) => s.name),
      required: false,
    });

    if (p.isCancel(workflowChoices)) {
      p.cancel("You'll be back. They always come back.");
      return null;
    }
    console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

    const selectedWorkflow = workflowChoices as string[];

    // Design skills
    console.clear();
    console.log(renderMiniHeader());
    console.log('');
    console.log(pc.dim('  ╭─── [2/4] DESIGN SKILLS ─────────────────────────────────────────────╮'));
    console.log(`  ${pc.dim('│')} Select design skills  ${pc.dim(`(${selectedWorkflow.length} workflow selected) · space · a · enter`)}`);
    console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

    const designChoices = await p.multiselect({
      message: '',
      options: designSkills.map((s) => ({
        value: s.name,
        label: s.name.padEnd(28),
        hint: s.description,
      })),
      initialValues: designSkills.slice(0, 4).map((s) => s.name),
      required: false,
    });

    if (p.isCancel(designChoices)) {
      p.cancel("You'll be back. They always come back.");
      return null;
    }
    console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

    const selectedDesign = designChoices as string[];
    selectedSkills = [...selectedWorkflow, ...selectedDesign];
  } else {
    selectedSkills =
      bundle === 'everything'
        ? SKILLS.map((s) => s.name)
        : bundle === 'designer'
          ? [...BUNDLES.designer.skills]
          : [...BUNDLES.workflow.skills];
  }

  // Step 3: Include homepage
  console.clear();
  console.log(renderMiniHeader());
  console.log('');
  console.log(pc.dim('  ╭─── [3/4] EXAMPLE HOMEPAGE ────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} Include the example homepage?  ${pc.dim('+6 files')}`);
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));
  console.log(pc.dim('  │   ╭───────────────────────────────────────────────────────────╮'));
  console.log(pc.dim('  │   │  claudecraft                            [theme picker]   │'));
  console.log(pc.dim('  │   │  Your taste. Their labor. Finally.                       │'));
  console.log(pc.dim('  │   │  [Commands] [Skills] [Themes]  ████ Theme Carousel ◄►    │'));
  console.log(pc.dim('  │   ╰───────────────────────────────────────────────────────────╯'));
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

  const includeHomepage = await p.select({
    message: '',
    options: [
      {
        value: true,
        label: 'Yes',
        hint: '+6 files · you can delete it later',
      },
      {
        value: false,
        label: 'No',
        hint: 'Blank App.tsx · the void awaits',
      },
    ],
  });

  if (p.isCancel(includeHomepage)) {
    p.cancel("You'll be back. They always come back.");
    return null;
  }
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

  // Step 4: Git init
  console.clear();
  console.log(renderMiniHeader());
  console.log('');
  console.log(pc.dim('  ╭─── [4/4] GIT INIT ────────────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} Initialize git?  ${pc.dim('init + commit · or suffer later')}`);
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

  const initGit = await p.select({
    message: '',
    options: [
      {
        value: true,
        label: 'Yes',
        hint: 'Fresh repo · future you says thanks',
      },
      {
        value: false,
        label: 'No',
        hint: 'No .git · living dangerously',
      },
    ],
  });

  if (p.isCancel(initGit)) {
    p.cancel("You'll be back. They always come back.");
    return null;
  }
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

  return {
    projectName: projectName as string,
    bundle: bundle as UserChoices['bundle'],
    selectedSkills,
    includeHomepage: includeHomepage as boolean,
    initGit: initGit as boolean,
  };
}

/**
 * Prompts for --init mode (existing project)
 * Only asks about skills selection
 */
export async function runInitPrompts(): Promise<InitChoices | null> {
  const workflowCount = SKILLS.filter((s) => s.group === 'workflow').length;

  // Bundle selection
  console.log(pc.dim('  ╭─── SKILL BUNDLE ────────────────────────────────────────────────────╮'));
  console.log(`  ${pc.dim('│')} How much help do you want?`);
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));
  console.log(pc.dim(`  │  everything  ${SKILLS.length} skills        workflow  ${workflowCount} skills`));
  console.log(pc.dim(`  │  designer    ${BUNDLES.designer.skills.length} skills        custom    you pick`));
  console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

  const bundle = await p.select({
    message: '',
    options: [
      {
        value: 'everything',
        label: `${pc.bold('Everything')}`,
        hint: `All ${SKILLS.length} skills · the full experience`,
      },
      {
        value: 'designer',
        label: `${pc.bold('Designer Essentials')}`,
        hint: `${BUNDLES.designer.skills.length} skills · UI, a11y, Figma`,
      },
      {
        value: 'workflow',
        label: `${pc.bold('Workflow Only')}`,
        hint: `${workflowCount} skills · process only`,
      },
      {
        value: 'custom',
        label: `${pc.bold('Let Me Pick')}`,
        hint: 'Control freak? Respect.',
      },
    ],
  });

  if (p.isCancel(bundle)) {
    p.cancel("You'll be back. They always come back.");
    return null;
  }
  console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

  let selectedSkills: string[] = [];

  if (bundle === 'custom') {
    const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
    const designSkills = SKILLS.filter((s) => s.group === 'design');

    // Workflow skills
    console.log('');
    console.log(pc.dim('  ╭─── WORKFLOW SKILLS ─────────────────────────────────────────────────╮'));
    console.log(`  ${pc.dim('│')} Select workflow skills  ${pc.dim('space: toggle · a: all · enter: confirm')}`);
    console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

    const workflowChoices = await p.multiselect({
      message: '',
      options: workflowSkills.map((s) => ({
        value: s.name,
        label: s.name.padEnd(28),
        hint: s.description,
      })),
      initialValues: workflowSkills.slice(0, 6).map((s) => s.name),
      required: false,
    });

    if (p.isCancel(workflowChoices)) {
      p.cancel("You'll be back. They always come back.");
      return null;
    }
    console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

    const selectedWorkflow = workflowChoices as string[];

    // Design skills
    console.log('');
    console.log(pc.dim('  ╭─── DESIGN SKILLS ───────────────────────────────────────────────────╮'));
    console.log(`  ${pc.dim('│')} Select design skills  ${pc.dim(`(${selectedWorkflow.length} workflow) · space · a · enter`)}`);
    console.log(pc.dim('  ├───────────────────────────────────────────────────────────────────────┤'));

    const designChoices = await p.multiselect({
      message: '',
      options: designSkills.map((s) => ({
        value: s.name,
        label: s.name.padEnd(28),
        hint: s.description,
      })),
      initialValues: designSkills.slice(0, 4).map((s) => s.name),
      required: false,
    });

    if (p.isCancel(designChoices)) {
      p.cancel("You'll be back. They always come back.");
      return null;
    }
    console.log(pc.dim('  ╰───────────────────────────────────────────────────────────────────────╯'));

    const selectedDesign = designChoices as string[];
    selectedSkills = [...selectedWorkflow, ...selectedDesign];
  } else {
    selectedSkills =
      bundle === 'everything'
        ? SKILLS.map((s) => s.name)
        : bundle === 'designer'
          ? [...BUNDLES.designer.skills]
          : SKILLS.filter((s) => s.group === 'workflow').map((s) => s.name);
  }

  return { selectedSkills };
}

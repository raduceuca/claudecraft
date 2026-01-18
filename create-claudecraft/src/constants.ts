export const PACKAGE_NAME = 'create-claudecraft';
export const VERSION = '1.0.0';
export const DEFAULT_PORT = 6969;
export const DEFAULT_THEME = 'halloween';

export const TAGLINE = 'Your taste. Their labor. Finally.';

export const STACK = {
  react: '18.x',
  typescript: '5.x',
  vite: '5.x',
  tailwind: '3.x',
  daisyui: '4.x',
} as const;

export const ASSETS = {
  skills: 27,
  commands: 7,
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
  { name: 'brainstorming', description: 'poke holes before you build', group: 'workflow', bytes: 2800 },
  { name: 'writing-plans', description: 'scope creep prevention', group: 'workflow', bytes: 3200 },
  { name: 'executing-plans', description: 'checkpoints for the anxious', group: 'workflow', bytes: 2400 },
  { name: 'systematic-debugging', description: 'denial → anger → acceptance → fix', group: 'workflow', bytes: 8500 },
  { name: 'test-driven-development', description: 'write the test first, cry later', group: 'workflow', bytes: 3100 },
  { name: 'verification-before-completion', description: 'did you actually check?', group: 'workflow', bytes: 1800 },
  { name: 'requesting-code-review', description: 'brace for feedback', group: 'workflow', bytes: 2200 },
  { name: 'receiving-code-review', description: 'they meant well', group: 'workflow', bytes: 1900 },
  { name: 'using-git-worktrees', description: 'branch isolation therapy', group: 'workflow', bytes: 2100 },
  { name: 'finishing-a-development-branch', description: 'merge it or delete it', group: 'workflow', bytes: 1700 },
  { name: 'subagent-driven-development', description: 'outsource to yourself', group: 'workflow', bytes: 4200 },
  { name: 'dispatching-parallel-agents', description: 'fake productivity, real results', group: 'workflow', bytes: 1600 },
  { name: 'writing-skills', description: 'teach Claude your ways', group: 'workflow', bytes: 5800 },
  { name: 'using-superpowers', description: 'RTFM energy', group: 'workflow', bytes: 1200 },

  // Design
  { name: 'react-best-practices', description: 'fewer re-renders, more peace', group: 'design', bytes: 4200 },
  { name: 'testing-patterns', description: 'tests that catch bugs', group: 'design', bytes: 3800 },
  { name: 'ui-skills', description: "CSS that cooperates", group: 'design', bytes: 2900 },
  { name: 'a11y-audit', description: 'WCAG compliance therapy', group: 'design', bytes: 3400 },
  { name: 'seo-review', description: 'feed the algorithm', group: 'design', bytes: 2100 },
  { name: 'og-image', description: 'cards worth clicking', group: 'design', bytes: 1800 },
  { name: 'microcopy', description: 'interface text that helps', group: 'design', bytes: 2200 },
  { name: 'sitemap-generator', description: 'crawler food', group: 'design', bytes: 1400 },
  { name: 'json-ld', description: 'structured data for bots', group: 'design', bytes: 1600 },
  { name: 'figma-to-code', description: 'pixel-perfect from Figma', group: 'design', bytes: 3200 },
  { name: 'design-polish', description: 'systematic polish passes', group: 'design', bytes: 2400 },
  { name: 'visual-iteration', description: 'mockup to code loop', group: 'design', bytes: 2100 },
  { name: 'ralph-wiggum-loops', description: 'sleep while Claude ships', group: 'design', bytes: 6800 },
];

export const BUNDLES = {
  everything: {
    name: 'Everything',
    description: 'All of it. No restraint.',
    skills: SKILLS.map((s) => s.name),
    commands: 6,
    files: 48,
  },
  designer: {
    name: 'Designer Essentials',
    description: 'UI, a11y, Figma, and enough process to stay sane.',
    skills: [
      'react-best-practices',
      'ui-skills',
      'a11y-audit',
      'testing-patterns',
      'seo-review',
      'systematic-debugging',
      'brainstorming',
      'writing-plans',
      'verification-before-completion',
      'design-polish',
      'visual-iteration',
      'ralph-wiggum-loops',
      'figma-to-code',
    ],
    commands: 4,
    files: 35,
  },
  workflow: {
    name: 'Workflow Only',
    description: 'Process without opinions.',
    skills: SKILLS.filter((s) => s.group === 'workflow').map((s) => s.name),
    commands: 3,
    files: 28,
  },
} as const;

export const COMMANDS = [
  { name: '/build', description: 'compile and hope' },
  { name: '/typecheck', description: 'surface the lies' },
  { name: '/lint', description: 'formatting tribunal' },
  { name: '/brainstorm', description: 'interrogate your assumptions' },
  { name: '/write-plan', description: 'think before you ship' },
  { name: '/execute-plan', description: 'stop planning, start building' },
  { name: '/ralph', description: 'autonomous loop templates' },
];

export const ERRORS = {
  dirExists: (name: string) => ({
    title: `"${name}" already exists`,
    body: `Your options:
  1. Pick a different name (creativity exercise)
  2. Delete the old one (commitment issues)
  3. Use --init to add skills to it (pragmatism)`,
  }),
  noBun: () => ({
    title: 'Bun not found',
    body: `The fast runtime. You need it.

  curl -fsSL https://bun.sh/install | bash

Then try again. We'll wait.`,
  }),
  network: () => ({
    title: 'Network gave up',
    body: `Either your wifi or npm. Probably npm.

Check your connection and retry. If npm is down,
join the mass hallucination at status.npmjs.org.`,
  }),
  noProject: () => ({
    title: 'Nothing here',
    body: `--init needs an existing project. This directory is empty.
No package.json. No hope.

Create something first:
  bun create claudecraft my-app`,
  }),
};

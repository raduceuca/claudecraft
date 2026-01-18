# create-claudecraft

Your taste. Their labor. Finally.

```bash
bun create claudecraft my-app
```

---

## What

Hey, designer. Your job isn't going anywhere—but it is getting weirder. The robots are here, and they have opinions about border-radius.

This is a boilerplate for people who'd rather shape the slop than become it. Pre-configured with design constraints, accessibility guilt trips, and 32 themes so you can procrastinate on the hard decisions.

---

## Install

```bash
bun create claudecraft my-app
cd my-app
bun dev
```

Open `localhost:6969`. Nice.

**Also works with:**
```bash
npx create-claudecraft my-app
pnpm create claudecraft my-app
```

---

## Stack

| Tool | Why |
|------|-----|
| React 18 | You know why |
| TypeScript 5 | Lies surfaced early |
| Vite 5 | Fast enough to feel productive |
| Tailwind 3 | Utility cope |
| DaisyUI 4 | 32 themes, 0 decisions |
| Vitest | Tests that might catch bugs |
| Bun | Speed you'll briefly appreciate |

---

## What's Inside

### 27 Skills

Guardrails. Claude wants to help. These make sure it helps *correctly*.

**Process** (via [obra/superpowers](https://github.com/obra/superpowers))

| Skill | What it does |
|-------|--------------|
| `brainstorming` | Poke holes before you build |
| `writing-plans` | Scope creep prevention |
| `executing-plans` | Checkpoints for the anxious |
| `test-driven-development` | Write the test first, cry later |
| `systematic-debugging` | Denial → anger → acceptance → fix |
| `verification-before-completion` | Did you actually check? |
| `requesting-code-review` | Brace for feedback |
| `receiving-code-review` | They meant well |
| `using-git-worktrees` | Branch isolation therapy |
| `finishing-a-development-branch` | Merge it or delete it |
| `subagent-driven-development` | Outsource to yourself |
| `dispatching-parallel-agents` | Fake productivity, real results |
| `writing-skills` | Teach Claude your ways |

**Design**

| Skill | What it does |
|-------|--------------|
| `react-best-practices` | Fewer re-renders, more peace |
| `testing-patterns` | Tests that find bugs, not LOC |
| `ui-skills` | CSS that cooperates |
| `a11y-audit` | WCAG compliance therapy |
| `seo-review` | Feed the algorithm |
| `og-image` | Social cards worth clicking |
| `microcopy` | Words that don't annoy users |
| `sitemap-generator` | Crawler food |
| `json-ld` | Structured data for bots |
| `figma-to-code` | Pixel-perfect from Figma |
| `design-polish` | Systematic polish passes |
| `visual-iteration` | Mockup to code loop |
| `ralph-wiggum-loops` | Sleep while Claude ships |

### 7 Commands

```
/build          Compile and hope
/typecheck      Surface the lies in your types
/lint           Formatting tribunal
/brainstorm     Interrogate your assumptions
/write-plan     Think before you ship
/execute-plan   Stop planning, start building
/ralph          Autonomous loop templates
```

### 32 Themes

DaisyUI ships 32 themes. Pick one. Everything updates. Decision deferred successfully.

### 2 Hooks

| Hook | What it does |
|------|--------------|
| `typecheck-after-edit` | TypeScript check after saves |
| `check-branch` | Warns before you commit to main |

---

## The Superpower

**Ralph Wiggum loops.** Claude works autonomously—building, checking, fixing—until done. Walk away. Come back to finished work.

```bash
/ralph-loop "Build a card component with hover states" \
  --completion-promise "COMPLETE" \
  --max-iterations 15
```

YC teams shipped 6 repos overnight. $50k contracts completed for $297 in API costs.

Named after the Simpsons character. Keeps going despite everything.

---

## Structure

```
.claude/
├── commands/           # /build, /lint, /ralph
├── hooks/              # typecheck, branch warnings
├── skills/             # 27 behavioral guardrails
├── settings.json       # hook config
└── settings.local.json # pre-approved chaos

src/
├── components/ui/      # Button, ThemeSelector, CodeBlock
├── context/            # ThemeContext
├── pages/              # HomePage
└── lib/                # utils

CLAUDE.md               # project brain dump
```

---

## Options

```bash
bun create claudecraft [name] [flags]

Flags:
  -y, --yes        Skip prompts. Use defaults.
  --no-git         Skip git init
  --no-install     Skip bun install
  --init           Add skills to existing project
  -h, --help       This
  -v, --version    Version number
```

---

## Requirements

**Bun** — The fast one.
```bash
curl -fsSL https://bun.sh/install | bash
```

**Claude Code** — The AI that reads your CLAUDE.md and (mostly) follows it.

---

## Links

[Website](https://claudecraft.dev) · [GitHub](https://github.com/raduceuca/claudecraft) · [Issues](https://github.com/raduceuca/claudecraft/issues)

---

## Credits

This project stands on the shoulders of giants.

### Core Stack

| Project | Creator(s) |
|---------|-----------|
| [React](https://react.dev) | Meta |
| [TypeScript](https://typescriptlang.org) | Microsoft |
| [Vite](https://vitejs.dev) | Evan You |
| [Tailwind CSS](https://tailwindcss.com) | Adam Wathan / Tailwind Labs |
| [DaisyUI](https://daisyui.com) | Pouya Saadeghi |
| [Bun](https://bun.sh) | Jarred Sumner / Oven |
| [Vitest](https://vitest.dev) | Anthony Fu / Vue team |

### CLI Tools

| Package | Creator |
|---------|---------|
| [@clack/prompts](https://github.com/natemoo-re/clack) | Nate Moore |
| [ink](https://github.com/vadimdemedes/ink) | Vadim Demedes |
| [figlet](https://github.com/patorjk/figlet.js) | Patrick Gillespie |
| [gradient-string](https://github.com/bokub/gradient-string) | Boris K |
| [picocolors](https://github.com/alexeyraspopov/picocolors) | Alexey Raspopov |

### Skills & Workflows

| Collection | Creator |
|------------|---------|
| [Superpowers](https://github.com/obra/superpowers) (13 skills) | Jesse Vincent |
| React Best Practices | [Vercel](https://vercel.com/design) |
| Testing Patterns | [Chris Wiles](https://github.com/ChrisWiles) |
| UI Skills | [ui-skills.com](https://www.ui-skills.com) |
| A11y Audit | [daffy0208](https://claude-plugins.dev) |

---

## License

MIT. Do whatever. Credit appreciated, not required.

---

Made by a designer who got tired of the slop. [@raduceuca](https://x.com/raduceuca)

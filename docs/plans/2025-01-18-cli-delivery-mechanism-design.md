# CLI Delivery Mechanism Design

**Date:** 2025-01-18
**Status:** Approved
**Author:** Claude + raduceuca

---

## Overview

Create `bun create claudecraft my-app` — an interactive CLI that scaffolds the claudecraft boilerplate with a designer-friendly, blueprint-aesthetic experience.

## Goals

1. **Lowest friction for users** — Single command to scaffold
2. **Maximum shareability** — Tweetable, memorable
3. **Educational** — Smart copy explains what things do
4. **On-brand** — Dark humor throughout

## Target User

Terminal-curious/comfortable designers who will evangelize to terminal-avoidant colleagues.

---

## CLI Experience

### Header

```
   ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗ ██████╗██████╗  █████╗ ███████╗████████╗
  ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
  ██║     ██║     ███████║██║   ██║██║  ██║█████╗  ██║     ██████╔╝███████║█████╗     ██║
  ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  ██║     ██╔══██╗██╔══██║██╔══╝     ██║
  ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗╚██████╗██║  ██║██║  ██║██║        ██║
   ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝
```

- Font: ANSI Shadow via figlet
- Gradient: #f28c18 → #6d28d9 (halloween theme colors)

### Manifest Box

```
┌─ manifest ──────────────────────────────────────────────────────────┐
│                                                                     │
│   The robots are here. Might as well make them useful.              │
│                                                                     │
│   STACK             ASSETS            DEFAULTS                      │
│   react    18.x     skills    23      theme    halloween            │
│   ts       5.x      commands   6      port     6969                 │
│   vite     5.x      themes    32      tests    vitest               │
│   tailwind 3.x      hooks      2      pkg      bun                  │
│   daisyui  4.x      components 6      license  MIT                  │
│                                                                     │
│   weight: ~48 files · 0 runtime dependencies · 0 excuses            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Prompts (4 steps)

**01/04 — Project Name (required)**
- Format: lowercase, a-z, 0-9, dashes
- Max: 64 chars
- Shows: `creates: ./my-app/`

**02/04 — Skill Bundle (optional)**
- Everything — 23 skills, 6 cmds, ~48 files
- Designer Essentials — 9 skills, 3 cmds, ~32 files
- Workflow Only — 13 skills, 3 cmds, ~28 files
- Let Me Pick — Custom selection with checkboxes

**02b/04 — Skill Picker (if "Let Me Pick")**
- Two groups: workflow (13) + design (9)
- Shows selected count and byte size
- Keyboard hints: space=toggle, a=all, enter=confirm

**03/04 — Include Homepage (optional)**
- Yes — "I learn by stealing" (+6 files)
- No — "I have my own ideas" (blank App.tsx)
- Includes ASCII preview mockup

**04/04 — Git Init (optional)**
- Yes — "Start fresh, commit often, blame later"
- No — "I'll handle my own version control drama"
- Default commit: "init: claudecraft scaffolding"

### Progress

```
┌─ progress ─────────────────────────────────────────────────────────┐
│                                                                    │
│  scaffolding    ████████████████████████  done    0.2s   48 files  │
│  dependencies   ████████████████░░░░░░░░  67%     4.2s   node_modules/
│  git init       ░░░░░░░░░░░░░░░░░░░░░░░░  queued  ─      .git/     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

elapsed: 4.4s · eta: ~8s
```

### Completion

Shows stats table:
- created, files, skills, commands, themes
- total time, dependencies, disk usage, theme, port

Plus helpful commands section with `/build`, `/brainstorm`, `/write-plan`.

---

## Package Architecture

```
create-claudecraft/
├── package.json              # name: "create-claudecraft"
├── bin/
│   └── cli.js                # entry point
├── src/
│   ├── index.ts              # main orchestrator
│   ├── prompts.ts            # interactive questions
│   ├── scaffold.ts           # file copying + templating
│   ├── ui.ts                 # blueprint boxes, gradients
│   └── constants.ts          # skill definitions, humor
├── templates/
│   ├── base/                 # always included
│   ├── skills/
│   │   ├── workflow/         # superpowers
│   │   └── design/           # designer skills
│   ├── components/           # UI components
│   └── homepage/             # optional example page
└── README.md
```

### Dependencies

| Package | Purpose |
|---------|---------|
| `@clack/prompts` | Interactive prompts |
| `figlet` | ASCII title |
| `gradient-string` | Color gradients |
| `picocolors` | Terminal colors |
| `fs-extra` | File operations |

---

## CLI Arguments

```
bun create claudecraft [project-name] [options]

Options:
  --yes, -y          Skip prompts, use defaults
  --dir, -d          Install in current directory
  --no-git           Skip git initialization
  --no-install       Skip dependency installation
  --verbose          Show debug output
  --help, -h         Show help
  --version, -v      Show version
```

---

## Error Handling

All errors include:
- What went wrong
- Options to fix it
- Dark humor closer

Examples:
- "Directory already exists" → Pick different name / delete / use --dir
- "bun not found" → Install command + "I'll wait"
- "Network error" → Check connection / try later / "complain on Twitter"

---

## Generated README

Includes:
- Quick start commands
- Stack overview
- Skills table with descriptions
- Commands table with descriptions
- Theme info
- Directory structure
- Links to docs
- Dark humor footer

---

## Publishing

**Package name:** `create-claudecraft`

**Sync strategy:** Manual copy from main repo initially, automate with GitHub Action later if tedious.

**Versioning:**
- Patch: bug fixes
- Minor: new skills/features
- Major: breaking changes

---

## Implementation Plan

1. Create `create-claudecraft/` directory structure
2. Implement UI components (boxes, gradients, progress)
3. Implement prompts flow
4. Implement scaffolding logic
5. Create template files from main repo
6. Test locally with `bun link`
7. Publish to npm
8. Update main repo README with new install method
9. Deploy updated homepage

---

## Open Questions

None — ready for implementation.

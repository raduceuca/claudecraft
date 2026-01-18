# Claude Code Project Template

A boilerplate for Claude Code / agent-driven development with React, TypeScript, Vite, DaisyUI, and Bun.

## Features

- **Bun** - Fast all-in-one JavaScript runtime
- **React 18** + TypeScript + Vite
- **DaisyUI** with 32 pre-installed themes
- **Theme Switching** with persistent localStorage
- **React Router** for navigation
- **ESLint** + TypeScript strict mode
- **Vitest** for testing
- **Claude Code ready** with CLAUDE.md and permissions

## Prerequisites

Install [Bun](https://bun.sh/):

```bash
curl -fsSL https://bun.sh/install | bash
```

## Quick Start

### Option 1: Use the init script

```bash
./scripts/init.sh my-project ~/projects
cd ~/projects/my-project
bun dev
```

### Option 2: Copy manually

```bash
cp -r claude-code-template my-project
cd my-project
rm -rf .git scripts
bun install
git init
bun dev
```

## Structure

```
├── CLAUDE.md                    # AI guidance document
├── .claude/
│   └── settings.local.json      # Claude Code permissions
├── src/
│   ├── components/ui/           # DaisyUI components
│   │   ├── Button.tsx           # Button with variants
│   │   └── ThemeSelector.tsx    # Theme dropdown
│   ├── context/
│   │   └── ThemeContext.tsx     # Theme state
│   ├── pages/                   # Route components
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript types
├── tailwind.config.js           # DaisyUI themes config
└── package.json
```

## Themes

32 themes pre-configured and ready to use:

**Light:** light, cupcake, bumblebee, emerald, corporate, garden, lofi, pastel, fantasy, wireframe, cmyk, autumn, acid, lemonade, winter, nord

**Dark:** dark, synthwave, retro, cyberpunk, valentine, halloween, aqua, forest, black, luxury, dracula, business, night, coffee, dim, sunset

**Custom:** Editable custom theme in `tailwind.config.js`

### Using Themes

```tsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme('cyberpunk')}>
      Switch to Cyberpunk
    </button>
  )
}
```

## DaisyUI Components

The template includes common DaisyUI patterns:

```tsx
// Buttons
<button className="btn btn-primary">Click me</button>
<button className="btn btn-secondary btn-outline">Outline</button>

// Cards
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content</p>
  </div>
</div>

// Inputs
<input className="input input-bordered" placeholder="Type..." />
<select className="select select-bordered">...</select>

// Alerts
<div className="alert alert-success">Success message</div>
```

See [DaisyUI docs](https://daisyui.com/components/) for all components.

## Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server (port 6969)
bun run build        # Production build
bun run lint         # Run ESLint
bun test             # Run tests
bun run preview      # Preview build

# Package management
bun add <package>    # Add dependency
bun add -d <package> # Add dev dependency
bun remove <package> # Remove package
```

## Customization

### Add a Custom Theme

Edit `tailwind.config.js`:

```js
daisyui: {
  themes: [
    // ... existing themes
    {
      mytheme: {
        "primary": "#6366f1",
        "secondary": "#f472b6",
        "accent": "#22d3ee",
        "neutral": "#1f2937",
        "base-100": "#ffffff",
        // ... more colors
      },
    },
  ],
}
```

### Adjust Permissions

Modify `.claude/settings.local.json` to add:
- API domains for `WebFetch`
- Additional bash commands

## Using with Claude Code

1. Open project in Claude Code
2. Claude reads CLAUDE.md automatically
3. Permissions from .claude/settings.local.json apply
4. Ask Claude to implement features

### Example Prompts

- "Add a new page for user settings"
- "Create a modal component"
- "Switch to the cyberpunk theme"
- "Add form validation"

## Tech Stack

| Tool | Purpose |
|------|---------|
| Bun | Package manager & runtime |
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| DaisyUI | Component library |
| Tailwind CSS | Utility classes |
| React Router | Navigation |
| Lucide | Icons |
| Vitest | Testing |

---

## Credits

This project stands on the shoulders of giants.

### Core Stack

| Project | Creator(s) | Link |
|---------|-----------|------|
| React | Meta | [react.dev](https://react.dev) |
| TypeScript | Microsoft | [typescriptlang.org](https://www.typescriptlang.org) |
| Vite | Evan You | [vitejs.dev](https://vitejs.dev) |
| Tailwind CSS | Adam Wathan / Tailwind Labs | [tailwindcss.com](https://tailwindcss.com) |
| DaisyUI | Pouya Saadeghi | [daisyui.com](https://daisyui.com) |
| Bun | Jarred Sumner / Oven | [bun.sh](https://bun.sh) |
| Vitest | Anthony Fu / Vue team | [vitest.dev](https://vitest.dev) |
| React Router | Remix team | [reactrouter.com](https://reactrouter.com) |
| Lucide | Lucide team | [lucide.dev](https://lucide.dev) |

### Skills & Workflows

| Skill Collection | Creator | Link |
|-----------------|---------|------|
| Superpowers (13 skills) | Jesse Vincent (obra) | [github.com/obra/superpowers](https://github.com/obra/superpowers) |
| React Best Practices | Vercel | [vercel.com/design](https://vercel.com/design) |
| Testing Patterns | Chris Wiles | [github.com/ChrisWiles](https://github.com/ChrisWiles/claude-code-showcase) |
| UI Skills | ui-skills.com | [ui-skills.com](https://www.ui-skills.com) |
| A11y Audit | daffy0208 | [claude-plugins.dev](https://claude-plugins.dev/skills/@daffy0208/ai-dev-standards/accessibility-engineer) |

### Utilities

| Package | Creator |
|---------|---------|
| clsx | Luke Edwards |
| tailwind-merge | dcastil |
| picocolors | Alexey Raspopov |

---

## License

MIT

# claudecraft

Shipshape from the start. This file provides guidance to Claude Code when working with this project.

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS + DaisyUI |
| **Build Tool** | Vite |
| **Package Manager** | Bun |
| **Port** | 6969 |

---

## Development Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server (port 6969)
bun run build        # TypeScript check + Vite build
bun run lint         # Run ESLint
bun test             # Run tests
bun run preview      # Preview production build

# Package management
bun add <package>    # Add dependency
bun add -d <package> # Add dev dependency
```

---

## Project Architecture

<!-- Replace with your project description -->
Brief description of what this project does and its purpose.

### Directory Structure

```
src/
├── components/      # Reusable UI components
│   └── ui/          # Base UI primitives
├── context/         # React Context providers
├── pages/           # Route-level components
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── data/            # Constants and mock data
```

### Key Files

- `src/App.tsx` - Main application component with routing
- `src/main.tsx` - Application entry point with providers
- `src/context/ThemeContext.tsx` - Theme switching logic
- `vite.config.ts` - Vite configuration with path aliases
- `tailwind.config.js` - Tailwind + DaisyUI configuration

---

## Design System

### UI Framework: DaisyUI

This project uses [DaisyUI](https://daisyui.com/) for UI components with 32 pre-installed themes.

### Theme Management

```tsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, setTheme, themes } = useTheme()
  // theme: current theme name
  // setTheme: function to change theme
  // themes: array of all available themes
}
```

### DaisyUI Component Classes

```tsx
// Buttons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary btn-outline">Outline</button>
<button className="btn btn-lg">Large</button>

// Cards
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

// Form inputs
<input className="input input-bordered" />
<select className="select select-bordered" />
<input type="checkbox" className="checkbox checkbox-primary" />
<input type="checkbox" className="toggle toggle-primary" />

// Alerts
<div className="alert alert-info">Info message</div>
<div className="alert alert-success">Success message</div>

// Badges
<span className="badge badge-primary">Badge</span>

// Loading
<span className="loading loading-spinner" />
```

See [DaisyUI docs](https://daisyui.com/components/) for full component list.

---

## Styling Guidelines - IMPORTANT

### DO ✅

- Use **DaisyUI component classes** first (`btn`, `card`, `input`)
- Use **DaisyUI semantic colors** (`bg-base-100`, `text-primary`, `bg-neutral`)
- Use **solid colors with opacity** when needed (`bg-black/50`, `border-primary/30`)
- Use **clean borders** for separation and visual hierarchy
- Apply **hover states** with `transition-all`
- Include **dark mode variants** using DaisyUI themes
- Keep it **minimal**: lots of whitespace, subtle shadows

### DON'T ❌

- **NO excessive gradients** - Don't overuse `bg-gradient-to-*` for decorative effects
- **NO fake glows** - Avoid `blur-*`, `shadow-*-glow` for artificial light emission
- **NO heavy shadows** - Prefer `shadow-sm` or `shadow-md` over `shadow-2xl`
- **DON'T mix design systems** - Stay consistent with DaisyUI patterns
- **DON'T forget accessibility** - Always include focus states and ARIA attributes

---

## Component Patterns

### Standard Component Structure

```tsx
interface Props {
  title: string
  variant?: 'primary' | 'secondary'
  onAction?: () => void
}

export function ComponentName({ title, variant = 'primary', onAction }: Props) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <button className={`btn btn-${variant}`} onClick={onAction}>
          Action
        </button>
      </div>
    </div>
  )
}
```

### Icon Pattern

```tsx
import { IconName } from 'lucide-react'

// Icons inherit text color
<IconName className="w-5 h-5 text-base-content" />
<IconName className="w-6 h-6 text-primary" />
```

### Form Pattern

```tsx
<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Label</span>
  </label>
  <input
    type="text"
    placeholder="Placeholder"
    className="input input-bordered w-full"
  />
  <label className="label">
    <span className="label-text-alt">Helper text</span>
  </label>
</div>
```

---

## Coding Guidelines

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Functions/hooks | camelCase | `useAuth.ts`, `formatDate.ts` |
| Types/interfaces | PascalCase | `UserData`, `ApiResponse` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Files | Match export name | `UserProfile.tsx` exports `UserProfile` |

### TypeScript Guidelines

- Use TypeScript interfaces in separate `types.ts` files for shared types
- Prefer `interface` over `type` for object shapes
- Always type component props
- Use strict mode (enabled in tsconfig)

### State Management

- Theme state via `ThemeContext`
- Local state with `useState` for component-specific data
- Consider Zustand for complex global state

---

## File Organization

### Component Files

```
src/components/
├── ui/              # Base primitives (Button, Input, Modal)
├── layout/          # Layout components (Header, Sidebar, Footer)
├── features/        # Feature-specific components
└── shared/          # Shared across features
```

### Types Files

```
src/types/
├── index.ts         # Common types, re-exports
├── api.ts           # API response types
└── [feature].ts     # Feature-specific types
```

---

## Testing

```bash
bun test               # Run all tests
bun test --watch       # Watch mode
bun run test:coverage  # With coverage report
```

- Tests live next to source files: `Component.tsx` → `Component.test.tsx`
- Use React Testing Library for component tests
- Test behavior, not implementation

---

## Environment Variables

Create `.env.local` for local development (never commit):

```env
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
```

Access in code: `import.meta.env.VITE_API_URL`

---

## Common Tasks

### Adding a New Theme

Edit `tailwind.config.js` and add to the `daisyui.themes` array:

```js
{
  mytheme: {
    "primary": "#6366f1",
    "secondary": "#f472b6",
    // ... other colors
  },
}
```

### Adding a New Component

1. Create file in `src/components/ui/`
2. Use DaisyUI classes for styling
3. Export from component file
4. Add types if needed

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed

---

## Common Mistakes to Avoid

❌ **Don't** use inline styles when Tailwind/DaisyUI classes exist
✅ **Do** use utility classes: `className="p-4 rounded-lg"`

❌ **Don't** create custom CSS for standard components
✅ **Do** use DaisyUI: `className="btn btn-primary"`

❌ **Don't** hardcode colors like `text-[#333]`
✅ **Do** use semantic colors: `text-base-content`

❌ **Don't** forget loading and error states
✅ **Do** handle all UI states: loading, error, empty, success

❌ **Don't** mix different icon libraries
✅ **Do** stick to Lucide React for consistency

❌ **Don't** skip TypeScript types
✅ **Do** type all props and return values

---

## Notes

<!-- Add project-specific notes, gotchas, or important context -->
- Uses **bun** as package manager (faster than npm/yarn)
- Theme persists in localStorage
- Path alias `@/` maps to `src/`
- All DaisyUI themes are pre-installed

---

## Credits

This boilerplate was scaffolded with [claudecraft](https://claudecraft.dev) by [@raduceuca](https://x.com/raduceuca).

### Stack Credits

| Project | Creator(s) |
|---------|-----------|
| [React](https://react.dev) | Meta |
| [TypeScript](https://typescriptlang.org) | Microsoft |
| [Vite](https://vitejs.dev) | Evan You |
| [Tailwind CSS](https://tailwindcss.com) | Adam Wathan / Tailwind Labs |
| [DaisyUI](https://daisyui.com) | Pouya Saadeghi |
| [Bun](https://bun.sh) | Jarred Sumner / Oven |

### Skills Credits

| Collection | Creator |
|------------|---------|
| [Superpowers](https://github.com/obra/superpowers) | Jesse Vincent (obra) |
| React Best Practices | [Vercel](https://vercel.com/design) |
| Testing Patterns | [Chris Wiles](https://github.com/ChrisWiles) |
| UI Skills | [ui-skills.com](https://www.ui-skills.com) |

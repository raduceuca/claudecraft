# Claudecraft

> **Shipshape from the start.** A designer-first boilerplate for building non-slop with Claude Code.

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Features](#features)
  - [Theme System](#theme-system)
  - [Component Library](#component-library)
  - [Accessibility](#accessibility)
  - [Skills Library](#skills-library)
- [Pages](#pages)
- [Components Reference](#components-reference)
- [Context & State Management](#context--state-management)
- [Utilities](#utilities)
- [Styling System](#styling-system)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Design Principles](#design-principles)
- [Directory Structure](#directory-structure)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Credits](#credits)

---

## Overview

### What is Claudecraft?

Claudecraft is a **meta-product**—a project template and foundation specifically designed for developers building applications with **Claude Code** (Anthropic's AI-powered CLI assistant). It serves multiple purposes:

| Purpose | Description |
|---------|-------------|
| **Working Application** | A functional React/TypeScript/Vite app with a self-documenting homepage |
| **Developer Guide** | Includes `CLAUDE.md` as a knowledge base for Claude Code to reference |
| **Skill Library** | Ships with 10 pre-configured skills for debugging, testing, UI patterns, and more |
| **Accessibility Template** | Built with WCAG 2.1 AA compliance and keyboard navigation from the start |
| **Theme Showcase** | Demonstrates DaisyUI's 32 pre-installed themes with interactive UI |

### Why Claudecraft?

When AI assistants generate code, they often produce "slop"—generic, over-engineered, or inconsistent output. Claudecraft provides:

- **Clear documentation** that guides Claude Code's decisions
- **Pre-built skills** for common development tasks
- **Safe permissions** configured out of the box
- **Automatic hooks** for build validation
- **Minimal UI** that works across 32 themes

### Project Metadata

| Field | Value |
|-------|-------|
| **Name** | claudecraft |
| **Version** | 0.0.1 |
| **Type** | ES Module |
| **License** | MIT |
| **Repository** | https://github.com/raduceuca/claudecraft |
| **Creator** | Radu Ceuca ([@raduceuca](https://x.com/raduceuca)) |

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) runtime installed
- Node.js 18+ (for compatibility)
- Git

### Installation

**Option 1: Clone Repository**
```bash
git clone https://github.com/raduceuca/claudecraft.git
cd claudecraft
bun install
bun dev
```

**Option 2: Download ZIP**

Download from [GitHub releases](https://github.com/raduceuca/claudecraft/archive/refs/heads/main.zip), extract, and run the commands above.

### Development Server

```bash
bun dev
```

The development server runs on **port 6969**: http://localhost:6969

### Available Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun dev` | Start development server (port 6969) |
| `bun run build` | TypeScript check + Vite production build |
| `bun run lint` | Run ESLint for code quality |
| `bun test` | Run Vitest test suite |
| `bun run test:coverage` | Generate test coverage report |
| `bun run preview` | Preview production build locally |

### Package Management

```bash
bun add <package>      # Add production dependency
bun add -d <package>   # Add development dependency
bun remove <package>   # Remove dependency
```

---

## Technical Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library with hooks and concurrent features |
| **TypeScript** | 5.6.2 | Static typing and enhanced developer experience |
| **Vite** | 5.4.10 | Fast dev server and optimized production bundler |
| **Bun** | Latest | JavaScript runtime and package manager |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.14 | Utility-first CSS framework |
| **DaisyUI** | 4.12.14 | Component library with 32 themes |
| **clsx** | 2.1.1 | Conditional class name utility |
| **tailwind-merge** | 2.5.4 | Resolve conflicting Tailwind classes |

### Routing & Navigation

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Router DOM** | 7.12.0 | Client-side routing |

### Icons

| Technology | Version | Purpose |
|------------|---------|---------|
| **Lucide React** | 0.460.0 | Modern icon library |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 2.1.4 | Fast unit test runner |
| **React Testing Library** | 16.0.1 | Component testing utilities |
| **jsdom** | 25.0.1 | DOM environment for tests |

### Code Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.13.0 | Code linting and style enforcement |
| **typescript-eslint** | 8.10.0 | TypeScript-specific ESLint rules |

---

## Architecture

### Application Structure

```
┌─────────────────────────────────────────────────────────┐
│                      index.html                          │
│                    (Entry Point)                         │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                      main.tsx                            │
│              (React DOM + Providers)                     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │              ThemeProvider                       │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │           BrowserRouter                  │   │    │
│  │  │  ┌───────────────────────────────────┐  │   │    │
│  │  │  │              App.tsx               │  │   │    │
│  │  │  └───────────────────────────────────┘  │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App.tsx
├── ErrorBoundary
│   ├── SkipLink
│   └── <Routes>
│       ├── HomePage
│       │   ├── ThemeSelector
│       │   ├── CopyCommand
│       │   ├── CodeBlock
│       │   ├── FilePreview (×4)
│       │   └── UICarousel
│       │       └── ThemeSelector
│       └── NotFoundPage
│           └── Button
```

### Data Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   useState   │───▶│  ThemeContext│───▶│ localStorage │
│  (Component) │    │   (Global)   │    │ (Persistent) │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │
       │                   ▼
       │            ┌──────────────┐
       └───────────▶│  data-theme  │
                    │  (Document)  │
                    └──────────────┘
```

### Routing Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Main landing page with product documentation |
| `/*` | `NotFoundPage` | Catch-all 404 error page |

---

## Features

### Theme System

#### Overview

Claudecraft includes **33 themes** (32 DaisyUI + 1 custom) with full persistence and instant switching.

#### Available Themes

**Light Themes (16)**
| | | | |
|---|---|---|---|
| light | cupcake | bumblebee | emerald |
| corporate | garden | lofi | pastel |
| fantasy | wireframe | cmyk | autumn |
| acid | lemonade | winter | nord |

**Dark Themes (16)**
| | | | |
|---|---|---|---|
| dark | synthwave | retro | cyberpunk |
| valentine | halloween | aqua | forest |
| black | luxury | dracula | business |
| night | coffee | dim | sunset |

**Custom Theme (1)**
| Color | Value | Usage |
|-------|-------|-------|
| Primary | `#6366f1` | Buttons, links, accents |
| Secondary | `#f472b6` | Secondary actions |
| Accent | `#22d3ee` | Highlights, badges |
| Neutral | `#1f2937` | Backgrounds, text |

#### Theme Persistence

Themes persist to `localStorage` under the key `'app-theme'`. The default theme is **halloween**.

#### Usage

```tsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
    >
      {themes.map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  )
}
```

#### How It Works

1. User selects a theme
2. `setTheme()` updates React state
3. `useEffect` triggers:
   - Sets `data-theme` attribute on `<html>`
   - Saves to `localStorage`
4. DaisyUI CSS variables update automatically
5. All components re-render with new colors

---

### Component Library

Claudecraft ships with a complete set of reusable UI components.

#### Button

A composable button with variants, sizes, and states.

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'link' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `outline` | `boolean` | `false` | Outline variant |
| `loading` | `boolean` | `false` | Show loading spinner |

**Usage**
```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Click me
</Button>

<Button variant="error" outline loading>
  Deleting...
</Button>
```

#### ThemeSelector

Dropdown for switching between all 33 themes.

**Features**
- Palette icon indicator
- Responsive label (hidden on mobile)
- Scrollable theme list
- Radio button selection
- Live preview on selection

**Usage**
```tsx
import { ThemeSelector } from '@/components/ui/ThemeSelector'

<ThemeSelector />
```

#### CodeBlock

Display code snippets with copy-to-clipboard.

**Props**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | Yes | Code content |
| `language` | `string` | No | Language label |

**Features**
- Language label display
- Copy button (hidden until hover/focus)
- Checkmark confirmation on copy
- 2-second timeout reset
- Keyboard accessible

**Usage**
```tsx
import { CodeBlock } from '@/components/ui/CodeBlock'

<CodeBlock language="bash">
  bun install && bun dev
</CodeBlock>
```

#### CopyCommand

Inline command display with copy functionality.

**Props**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `command` | `string` | Yes | Command text |

**Features**
- Monospace font styling
- Copy icon on hover
- Inline-flex layout
- Screen reader feedback

**Usage**
```tsx
import { CopyCommand } from '@/components/ui/CopyCommand'

<CopyCommand command="bun dev" />
```

#### FilePreview

Collapsible file content previewer.

**Props**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filename` | `string` | Yes | File name to display |
| `description` | `string` | Yes | Brief file description |
| `content` | `string` | Yes | File content |
| `language` | `string` | No | Syntax highlighting hint |

**Features**
- Expand/collapse toggle
- Animated chevron rotation
- Bordered container with hover states
- Pre-formatted code display
- Full ARIA compliance

**Usage**
```tsx
import { FilePreview } from '@/components/ui/FilePreview'

<FilePreview
  filename="package.json"
  description="Project configuration"
  content={JSON.stringify(packageJson, null, 2)}
  language="json"
/>
```

#### UICarousel

Interactive carousel showcasing DaisyUI components.

**Features**
- 10 pre-built demo slides
- Auto-rotate (3.5s interval)
- Manual navigation (prev/next/dots)
- Pause on hover
- Integrated theme selector
- Keyboard accessible

**Slides Include**
1. Chat interface
2. Card with avatar
3. Alert notifications
4. Modal dialog
5. Stats display
6. Progress bars
7. Tabbed interface
8. Form elements
9. Timeline component
10. Star rating

**Usage**
```tsx
import { UICarousel } from '@/components/ui/UICarousel'

<UICarousel />
```

#### SkipLink

Accessibility-focused skip navigation link.

**Features**
- Hidden by default
- Visible on keyboard focus
- Jumps to `#main-content`
- High contrast styling

**Usage**
```tsx
import { SkipLink } from '@/components/ui/SkipLink'

// In App.tsx
<SkipLink />
<main id="main-content">
  {/* Content */}
</main>
```

#### ErrorBoundary

Class-based React error boundary.

**Props**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to wrap |
| `fallback` | `ReactNode` | No | Custom error UI |

**Features**
- Catches render errors
- Displays friendly error message
- Refresh button
- Optional custom fallback

**Usage**
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

<ErrorBoundary>
  <App />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorPage />}>
  <RiskyComponent />
</ErrorBoundary>
```

---

### Accessibility

Claudecraft is built with **WCAG 2.1 AA** compliance as a foundation.

#### Implemented Features

| Feature | Implementation |
|---------|----------------|
| **Skip Link** | `SkipLink` component jumps to `#main-content` |
| **Screen Reader Support** | `.sr-only` class for hidden but accessible text |
| **Focus Indicators** | `:focus-visible` styles for keyboard users |
| **Reduced Motion** | Respects `prefers-reduced-motion` media query |
| **Semantic HTML** | Proper heading hierarchy, landmarks, lists |
| **ARIA Labels** | All interactive elements labeled appropriately |
| **Keyboard Navigation** | Full keyboard support for all components |
| **Color Contrast** | DaisyUI themes meet contrast requirements |
| **Touch Targets** | Minimum 44×44px for interactive elements |

#### CSS Classes

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  /* ... */
}

/* Skip link styling */
.skip-link {
  /* Hidden by default, visible on focus */
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid oklch(var(--p));
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### ARIA Patterns Used

- `aria-label` - Descriptive labels for icons and buttons
- `aria-expanded` - Collapsible sections state
- `aria-controls` - Links controls to controlled element
- `aria-hidden` - Decorative icons
- `aria-live="polite"` - Dynamic content updates
- `role="status"` - Copy confirmation messages

---

### Skills Library

Claudecraft includes **10 pre-configured skills** for Claude Code.

#### Included Skills

| Skill | Source | Description |
|-------|--------|-------------|
| **systematic-debugging** | obra/superpowers | Four-phase debugging methodology for root cause analysis |
| **testing-patterns** | ChrisWiles | Vitest and React Testing Library patterns |
| **react-best-practices** | Vercel | React/Next.js performance optimization |
| **ui-skills** | ui-skills.com | Modern CSS and UI building constraints |
| **seo-review** | Built-in | Meta tags, Open Graph, heading analysis |
| **a11y-audit** | daffy0208 | WCAG 2.1 AA compliance checklist |
| **og-image** | Built-in | Social media sharing image generation |
| **microcopy** | Built-in | Button labels, error messages, UI copy |
| **sitemap-generator** | Built-in | XML sitemap and robots.txt creation |
| **json-ld** | Built-in | Structured data markup |

#### Skill Location

Skills are stored in `.claude/skills/`:

```
.claude/skills/
├── ui-skills/
│   └── SKILL.md
├── systematic-debugging/
│   └── SKILL.md
├── testing-patterns/
│   └── SKILL.md
└── ...
```

#### Using Skills

Skills are automatically available to Claude Code. They can be invoked:

1. **Automatically** - Claude Code detects relevant contexts
2. **Explicitly** - User requests specific skill (e.g., "run a11y audit")

---

## Pages

### HomePage

**Path:** `/`
**File:** `src/pages/HomePage.tsx`

The main landing page serves as both product showcase and documentation.

#### Sections

1. **Header**
   - Product title and branding
   - Value proposition
   - Call-to-action

2. **Get Started**
   - Download options (ZIP, Git)
   - Installation commands
   - Port information

3. **Stack**
   - Technology grid (8 logos)
   - Visual showcase of tools

4. **What's Inside**
   - Four expandable file previews
   - Shows key configuration files

5. **Skills**
   - List of 10 included skills
   - Descriptions and sources

6. **UI Components**
   - Interactive UICarousel
   - Theme selector demo

7. **Project Structure**
   - Directory tree
   - Key file descriptions

8. **Why Claudecraft**
   - Value propositions
   - Feature highlights

9. **Footer**
   - Creator attribution
   - Social links

---

### NotFoundPage

**Path:** `/*` (catch-all)
**File:** `src/pages/NotFoundPage.tsx`

Standard 404 error page.

**Elements**
- Large "404" heading
- Friendly error message
- "Back to home" button using `Button` component

---

## Components Reference

### Complete Component List

| Component | File | Category | Description |
|-----------|------|----------|-------------|
| `Button` | `ui/Button.tsx` | Interactive | Composable button with variants |
| `ThemeSelector` | `ui/ThemeSelector.tsx` | Interactive | Theme switching dropdown |
| `CodeBlock` | `ui/CodeBlock.tsx` | Display | Code with copy functionality |
| `CopyCommand` | `ui/CopyCommand.tsx` | Display | Inline command with copy |
| `FilePreview` | `ui/FilePreview.tsx` | Display | Collapsible file viewer |
| `UICarousel` | `ui/UICarousel.tsx` | Display | Component showcase carousel |
| `SkipLink` | `ui/SkipLink.tsx` | A11y | Skip navigation link |
| `ErrorBoundary` | `ErrorBoundary.tsx` | Utility | React error boundary |

### Component Patterns

#### Standard Structure

```tsx
interface Props {
  title: string
  variant?: 'primary' | 'secondary'
  onAction?: () => void
}

export function ComponentName({
  title,
  variant = 'primary',
  onAction
}: Props) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <button
          className={`btn btn-${variant}`}
          onClick={onAction}
        >
          Action
        </button>
      </div>
    </div>
  )
}
```

#### Icon Usage

```tsx
import { IconName } from 'lucide-react'

// Icons inherit text color
<IconName className="w-5 h-5 text-base-content" />
<IconName className="w-6 h-6 text-primary" />

// Decorative icons
<IconName className="w-5 h-5" aria-hidden="true" />
```

#### Form Pattern

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

## Context & State Management

### ThemeContext

**File:** `src/context/ThemeContext.tsx`

Manages global theme state with localStorage persistence.

#### Exports

| Export | Type | Description |
|--------|------|-------------|
| `THEMES` | `const string[]` | Array of all 33 theme names |
| `Theme` | `type` | Union type of all theme names |
| `ThemeProvider` | `component` | Context provider wrapper |
| `useTheme` | `hook` | Access theme context |

#### useTheme Hook

```tsx
const { theme, setTheme, themes } = useTheme()
```

| Return | Type | Description |
|--------|------|-------------|
| `theme` | `Theme` | Current active theme |
| `setTheme` | `(theme: Theme) => void` | Change active theme |
| `themes` | `Theme[]` | All available themes |

#### Implementation Details

- **Storage Key:** `'app-theme'`
- **Default Theme:** `'halloween'`
- **Validation:** Checks if stored theme exists in `THEMES`
- **DOM Update:** Sets `data-theme` on `document.documentElement`

---

## Utilities

### cn() Function

**File:** `src/lib/utils.ts`

Merges Tailwind CSS classes with proper precedence handling.

```tsx
import { cn } from '@/lib/utils'

// Basic usage
cn('px-4 py-2', 'px-8')  // Returns: 'py-2 px-8'

// Conditional classes
cn('base-class', isActive && 'active-class')

// Object syntax
cn('base', { 'active': isActive, 'disabled': isDisabled })

// Array syntax
cn(['class1', 'class2'], conditionalClass)
```

#### Dependencies

- **clsx:** Conditional class construction
- **tailwind-merge:** Resolves Tailwind class conflicts

---

## Styling System

### Tailwind CSS Configuration

**File:** `tailwind.config.js`

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [/* 32 themes + 1 custom */],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
}
```

### CSS Variables

**File:** `src/index.css`

```css
:root {
  --rounded-box: 0.25rem;
  --rounded-btn: 0.25rem;
  --rounded-badge: 0.25rem;
}
```

### DaisyUI Classes

#### Component Classes

```css
/* Buttons */
btn btn-primary btn-secondary btn-accent
btn-ghost btn-link btn-outline
btn-xs btn-sm btn-md btn-lg

/* Cards */
card card-body card-title card-actions
bg-base-100 shadow-xl

/* Forms */
input input-bordered input-primary
select select-bordered
checkbox checkbox-primary
toggle toggle-primary

/* Alerts */
alert alert-info alert-success
alert-warning alert-error

/* Badges */
badge badge-primary badge-secondary

/* Loading */
loading loading-spinner loading-dots
```

#### Semantic Colors

| Color | Usage |
|-------|-------|
| `base-100` | Primary background |
| `base-200` | Secondary background |
| `base-300` | Tertiary background |
| `base-content` | Primary text |
| `primary` | Primary actions |
| `primary-content` | Text on primary |
| `secondary` | Secondary actions |
| `accent` | Highlights |
| `neutral` | Neutral elements |

### Design Guidelines

#### DO

- Use DaisyUI component classes first
- Use semantic colors (`bg-base-100`, `text-primary`)
- Use solid colors with opacity (`bg-black/50`)
- Apply hover states with `transition-all`
- Include focus states and ARIA attributes
- Keep minimal with whitespace

#### DON'T

- Avoid excessive gradients
- Avoid fake glows (`blur-*`, `shadow-*-glow`)
- Don't use heavy shadows (`shadow-2xl`)
- Don't mix design systems
- Don't hardcode colors (`text-[#333]`)
- Don't skip loading/error states

---

## Configuration

### Vite Configuration

**File:** `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 6969,
    host: true,
  },
})
```

### TypeScript Configuration

**File:** `tsconfig.json`

| Setting | Value |
|---------|-------|
| Target | ES2022 |
| Module | ESNext |
| JSX | react-jsx |
| Strict | true |
| Path Aliases | `@/*` → `src/*` |

### ESLint Configuration

**File:** `eslint.config.js`

- TypeScript support via `typescript-eslint`
- React Hooks rules
- React Refresh rules
- No unused variables (error level)

### Claude Code Permissions

**File:** `.claude/settings.local.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(bun:*)",
      "Bash(git:*)",
      "Bash(rm:-rf node_modules)",
      "Bash(bunx:*)",
      "Bash(open:*)",
      "Bash(cat:*)",
      "Bash(ls:*)"
    ]
  }
}
```

---

## Development

### Local Development

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Open in browser
open http://localhost:6969
```

### Hot Module Replacement

Vite provides instant HMR for:
- React components
- CSS/Tailwind changes
- TypeScript files

### Path Aliases

Use `@/` to import from `src/`:

```tsx
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
```

### Adding New Components

1. Create file in `src/components/ui/`
2. Use DaisyUI classes for styling
3. Add TypeScript interface for props
4. Export as named export

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed

### Adding New Themes

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
        // ... other colors
      },
    },
  ],
}
```

---

## Testing

### Test Framework

- **Runner:** Vitest 2.1.4
- **DOM:** jsdom 25.0.1
- **Utilities:** React Testing Library 16.0.1

### Running Tests

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Coverage report
bun run test:coverage

# Run specific file
bun test Button.test.tsx
```

### Test File Convention

Tests live next to source files:

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx
```

### Testing Patterns

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## Design Principles

### Core Philosophy

1. **Designer-First** - Clear constraints prevent AI "slop"
2. **Accessibility-First** - WCAG 2.1 AA from the start
3. **Minimal by Default** - Only add what's needed
4. **Theme-Agnostic** - Works across all 32+ themes
5. **AI-Optimized** - Documentation guides Claude Code

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Functions/hooks | camelCase | `useAuth.ts` |
| Types/interfaces | PascalCase | `UserData` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Files | Match export | `Button.tsx` → `Button` |

### Code Style

- Prefer `interface` over `type` for objects
- Always type component props
- Use strict TypeScript mode
- Functional components with hooks
- Named exports for components

---

## Directory Structure

```
claudecraft/
├── .claude/                    # Claude Code configuration
│   ├── commands/               # Custom CLI commands
│   │   ├── build.md
│   │   ├── lint.md
│   │   └── typecheck.md
│   ├── hooks/                  # Git hooks
│   ├── skills/                 # Skill definitions
│   │   ├── ui-skills/
│   │   ├── systematic-debugging/
│   │   ├── testing-patterns/
│   │   └── ...
│   ├── settings.json           # Hook configuration
│   └── settings.local.json     # Permissions (gitignored)
│
├── src/                        # Application source
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── CopyCommand.tsx
│   │   │   ├── FilePreview.tsx
│   │   │   ├── SkipLink.tsx
│   │   │   ├── ThemeSelector.tsx
│   │   │   └── UICarousel.tsx
│   │   └── ErrorBoundary.tsx
│   │
│   ├── context/                # React Context providers
│   │   └── ThemeContext.tsx
│   │
│   ├── pages/                  # Route-level components
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── lib/                    # Utilities and helpers
│   │   └── utils.ts
│   │
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts
│   │
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── public/                     # Static assets
│
├── CLAUDE.md                   # AI guidance document
├── CLAUDECRAFT.MD              # This file
├── README.md                   # Setup instructions
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── tailwind.config.js          # Tailwind + DaisyUI config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint config
└── index.html                  # HTML entry point
```

---

## Dependencies

### Production Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| `react` | 18.3.1 | UI library |
| `react-dom` | 18.3.1 | React DOM renderer |
| `react-router-dom` | 7.12.0 | Client-side routing |
| `lucide-react` | 0.460.0 | Icon library |
| `clsx` | 2.1.1 | Class name utility |
| `tailwind-merge` | 2.5.4 | Tailwind class merging |

### Development Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| `typescript` | 5.6.2 | Type system |
| `vite` | 5.4.10 | Build tool |
| `@vitejs/plugin-react` | 4.3.3 | React plugin for Vite |
| `tailwindcss` | 3.4.14 | CSS framework |
| `daisyui` | 4.12.14 | Component library |
| `@tailwindcss/typography` | 0.5.19 | Typography plugin |
| `vitest` | 2.1.4 | Test runner |
| `@testing-library/react` | 16.0.1 | Testing utilities |
| `jsdom` | 25.0.1 | DOM environment |
| `eslint` | 9.13.0 | Linter |
| `typescript-eslint` | 8.10.0 | TS ESLint support |
| `autoprefixer` | 10.4.20 | CSS vendor prefixes |
| `postcss` | 8.4.47 | CSS processing |

---

## Deployment

### Building for Production

```bash
bun run build
```

This runs:
1. TypeScript type checking
2. Vite production build
3. Output to `dist/` folder

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── ...
```

### Preview Production Build

```bash
bun run preview
```

### Deployment Platforms

Claudecraft can be deployed to any static hosting:

- **Vercel** (configured via `.vercel/`)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**

### Environment Variables

Create `.env.local` for local development:

```env
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Credits

### Creator

**Radu Ceuca**
- Twitter/X: [@raduceuca](https://x.com/raduceuca)
- GitHub: [raduceuca](https://github.com/raduceuca)

### Technology Credits

- **React** - Meta
- **TypeScript** - Microsoft
- **Vite** - Evan You & contributors
- **Tailwind CSS** - Tailwind Labs
- **DaisyUI** - Pouya Saadeghi
- **Vitest** - Anthony Fu & contributors
- **Lucide** - Lucide contributors
- **Bun** - Oven

### Skill Credits

- **systematic-debugging** - obra/superpowers
- **testing-patterns** - ChrisWiles
- **react-best-practices** - Vercel Engineering
- **ui-skills** - ui-skills.com
- **a11y-audit** - daffy0208

---

## License

MIT License - See repository for details.

---

## Changelog

### v0.0.1 (Initial Release)

- React 18 + TypeScript + Vite setup
- DaisyUI with 32 themes
- 8 reusable UI components
- Theme persistence system
- Accessibility features
- 10 pre-configured skills
- Claude Code integration
- Comprehensive documentation

---

<div align="center">

**Built with care for developers who build with AI.**

[GitHub](https://github.com/raduceuca/claudecraft) · [Twitter](https://x.com/raduceuca)

</div>

# Task: Make UI Library Optional in create-claudecraft CLI

## Context

create-claudecraft currently bundles DaisyUI as the default UI library. This is too opinionated for a tool focused on transferable design constraints. The skills and CLAUDE.md structure are the real value—not a specific component library.

## Goal

Add UI library selection as the **final step** in the interactive CLI flow. Users choose their preferred approach, and the scaffolded project adjusts accordingly.

## UI Library Options
```
┌─────────────────────────────────────────────────┐
│  UI Library (optional)                          │
│                                                 │
│  ○ None - Tailwind only (recommended)           │
│  ○ DaisyUI - 32 themes, batteries included      │
│  ○ shadcn/ui - Copy-paste primitives            │
│  ○ Headless - Radix primitives + Tailwind       │
└─────────────────────────────────────────────────┘
```

"None" should be the default/recommended option. The tool's value is constraints and skills, not bundled UI.

## Files to Modify

### 1. `src/prompts.ts` (or equivalent CLI prompt file)

Add a new prompt step after existing prompts:
```typescript
const uiLibrary = await select({
  message: 'UI Library (optional)',
  options: [
    { value: 'none', label: 'None - Tailwind only (recommended)', hint: 'Maximum flexibility' },
    { value: 'daisyui', label: 'DaisyUI - 32 themes, batteries included' },
    { value: 'shadcn', label: 'shadcn/ui - Copy-paste primitives' },
    { value: 'headless', label: 'Headless - Radix primitives + Tailwind' },
  ],
  initialValue: 'none',
})
```

### 2. `src/scaffold.ts` (or equivalent scaffolding logic)

Adjust scaffolding based on `uiLibrary` choice:

#### Dependencies by choice:

**none:**
```json
{
  "dependencies": {
    // No UI library deps
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

**daisyui:**
```json
{
  "dependencies": {
    "daisyui": "^4.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

**shadcn:**
```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "@radix-ui/react-slot": "^1.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

**headless:**
```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "@radix-ui/react-select": "^2.x",
    "@radix-ui/react-tabs": "^1.x",
    "@radix-ui/react-tooltip": "^1.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

### 3. Template Variants

Create template variants per UI library choice:
```
templates/
├── base/                    # Shared across all (vite.config, tsconfig, etc.)
├── ui-none/
│   ├── tailwind.config.js   # Tailwind only, no plugins beyond typography
│   ├── CLAUDE.md            # Generic component patterns
│   └── components/          # Minimal: ErrorBoundary, SkipLink only
├── ui-daisyui/
│   ├── tailwind.config.js   # Current config with DaisyUI + 32 themes
│   ├── CLAUDE.md            # DaisyUI-specific patterns (btn, card, etc.)
│   └── components/          # ThemeSelector, Button, etc.
├── ui-shadcn/
│   ├── tailwind.config.js   # shadcn conventions (CSS variables)
│   ├── CLAUDE.md            # shadcn patterns, cn() utility
│   ├── components.json      # shadcn config
│   └── components/          # Button with CVA, basic primitives
└── ui-headless/
    ├── tailwind.config.js   # Clean Tailwind
    ├── CLAUDE.md            # Radix + Tailwind patterns
    └── components/          # Radix-wrapped primitives
```

### 4. CLAUDE.md Variants

Each UI library choice needs a different "Design System" and "Component Patterns" section:

**none:** Focus on vanilla Tailwind patterns, no component library references
**daisyui:** Current CLAUDE.md content (btn, card, semantic colors)
**shadcn:** cn() utility, CVA patterns, CSS variable theming
**headless:** Radix primitive patterns, data-state styling

### 5. Homepage Adjustment

The current HomePage.tsx references DaisyUI heavily. Options:

**Option A:** Strip HomePage to minimal for all choices, let user build
**Option B:** Create HomePage variants per UI library
**Option C:** Create a generic HomePage that works with any (Tailwind-only styling)

Recommend **Option C** — single HomePage using only Tailwind utilities, works regardless of UI library choice.

### 6. ThemeSelector Component

- **daisyui:** Keep current ThemeSelector (32 themes)
- **shadcn:** Create variant using CSS variables (light/dark/system)
- **headless:** Same as shadcn approach
- **none:** Don't include ThemeSelector, or include minimal light/dark toggle

### 7. Skills Updates

Review skills that reference DaisyUI specifically:

- `skills/design/ui-skills/SKILL.md` — make generic or create variants
- `skills/design/design-polish/SKILL.md` — check for DaisyUI references
- Any skill mentioning "btn", "card", "bg-base-100" etc.

Either:
- Make skills UI-library-agnostic (preferred)
- Or create skill variants per choice (more maintenance)

## Implementation Order

1. Create the template directory structure with variants
2. Create `tailwind.config.js` for each variant
3. Create `CLAUDE.md` for each variant  
4. Create minimal component sets for each variant
5. Update `prompts.ts` to add UI library selection
6. Update `scaffold.ts` to copy correct templates based on choice
7. Update `package.json` template to include correct deps based on choice
8. Create generic HomePage that works with all choices
9. Update skills to be UI-library-agnostic where possible
10. Test all four paths end-to-end

## Acceptance Criteria

- [ ] Running `bun create claudecraft my-app` shows UI library prompt as final step
- [ ] Default selection is "None - Tailwind only"
- [ ] Each option produces a working, buildable project
- [ ] `bun dev` works for all four choices
- [ ] `bun run typecheck` passes for all four choices
- [ ] CLAUDE.md accurately reflects the chosen UI library
- [ ] No DaisyUI references appear when "none" is selected
- [ ] Skills work regardless of UI library choice
- [ ] `-y` flag uses "none" as default

## Notes

- Keep the 27 skills and 7 commands intact—they're UI-library-agnostic
- The hooks (typecheck-after-edit, check-branch) don't need changes
- Consider adding `--ui` flag for non-interactive: `bun create claudecraft my-app --ui=shadcn`
---
name: design
description: Component recommendations and design-to-code translation for designers working with Claude Code.
---

# Design Skill

Bridge designer intent to implementation. When invoked, help the user select components, translate design concepts, and suggest UI patterns.

## How to Use

- `/design` - Get guidance on implementing any UI pattern
- `/design [pattern]` - Get specific recommendations for a pattern (e.g., `/design pricing table`)
- `/design help` - Show all available component categories

## Component Reference

### When to Use Each Component

| Pattern | DaisyUI Component | When to Use |
|---------|------------------|-------------|
| Primary action | `btn btn-primary` | Single most important action |
| Secondary action | `btn btn-secondary` or `btn btn-ghost` | Alternative actions |
| Destructive action | `btn btn-error` | Delete, remove, cancel subscriptions |
| Content container | `card` | Group related content with clear boundaries |
| Full-width banner | `hero` | Landing pages, key marketing messages |
| Status messages | `alert` | Feedback after user actions |
| Categories/tags | `badge` | Labels, counts, status indicators |
| Loading states | `loading loading-spinner` | Async operations |
| Progress | `progress` | Determinate progress bars |
| Navigation | `tabs` | Switch between related views |
| Theme switching | `ThemeSelector` (custom) | Let users pick from 32 themes |

### Layout Patterns

#### Marketing/Landing Page
```tsx
<div className="hero min-h-dvh bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold text-balance">Headline</h1>
      <p className="py-6 text-pretty">Description</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

#### Dashboard Layout
```tsx
<div className="drawer lg:drawer-open">
  <input id="drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Main content */}
    <div className="p-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Metric</div>
          <div className="stat-value">Value</div>
        </div>
      </div>
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="drawer" className="drawer-overlay" />
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar menu items */}
    </ul>
  </div>
</div>
```

#### Card Grid
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <div key={item.id} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Action</button>
        </div>
      </div>
    </div>
  ))}
</div>
```

#### Form Layout
```tsx
<form className="space-y-4 max-w-md">
  <div className="form-control">
    <label className="label">
      <span className="label-text">Email</span>
    </label>
    <input type="email" className="input input-bordered" />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input type="password" className="input input-bordered" />
  </div>

  <button type="submit" className="btn btn-primary w-full">
    Submit
  </button>
</form>
```

### Common UI Patterns

#### Pricing Table
```tsx
<div className="grid gap-6 md:grid-cols-3">
  <div className="card bg-base-100 border border-base-300">
    <div className="card-body">
      <h3 className="card-title">Basic</h3>
      <div className="text-3xl font-bold">$9<span className="text-base font-normal">/mo</span></div>
      <ul className="space-y-2 my-4">
        <li className="flex items-center gap-2">
          <CheckIcon /> Feature 1
        </li>
      </ul>
      <button className="btn btn-outline">Choose</button>
    </div>
  </div>

  <div className="card bg-primary text-primary-content">
    <div className="card-body">
      <span className="badge badge-secondary">Popular</span>
      <h3 className="card-title">Pro</h3>
      <div className="text-3xl font-bold">$29<span className="text-base font-normal">/mo</span></div>
      <ul className="space-y-2 my-4">
        <li className="flex items-center gap-2">
          <CheckIcon /> Everything in Basic
        </li>
      </ul>
      <button className="btn btn-secondary">Choose</button>
    </div>
  </div>
</div>
```

#### Empty State
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="text-6xl mb-4">📭</div>
  <h3 className="text-lg font-semibold">No items yet</h3>
  <p className="text-base-content/60 mb-4">Get started by creating your first item.</p>
  <button className="btn btn-primary">Create Item</button>
</div>
```

#### Confirmation Modal
```tsx
<dialog id="confirm_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure?</h3>
    <p className="py-4">This action cannot be undone.</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-ghost mr-2">Cancel</button>
        <button className="btn btn-error">Delete</button>
      </form>
    </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

## Claudecraft Custom Components

Always prefer these over creating new ones:

| Component | Import | Use For |
|-----------|--------|---------|
| `Button` | `@/components/ui/Button` | Typed button with variants, sizes, loading |
| `CodeBlock` | `@/components/ui/CodeBlock` | Display code with copy button |
| `CopyCommand` | `@/components/ui/CopyCommand` | CLI commands user can copy |
| `FilePreview` | `@/components/ui/FilePreview` | Expandable file previews |
| `ThemeSelector` | `@/components/ui/ThemeSelector` | Theme dropdown |

## Design Constraints

Follow CLAUDE.md styling guidelines:

### DO
- Use DaisyUI semantic colors (`bg-base-100`, `text-primary`)
- Use DaisyUI component classes (`btn`, `card`, `input`)
- Keep it minimal: whitespace, subtle shadows (`shadow-sm`, `shadow-md`)
- Include hover states with `transition-all`
- Use `text-balance` for headings, `text-pretty` for body
- Use `min-h-dvh` not `min-h-screen`

### DON'T
- No excessive gradients
- No fake glows or heavy shadows (`shadow-2xl`)
- No hardcoded colors like `text-[#333]`
- Don't forget focus states and ARIA attributes

## Process

When user asks for help with a UI pattern:

1. Understand what they're trying to build
2. Recommend appropriate DaisyUI components
3. Check if a claudecraft custom component exists
4. Provide copy-paste code using semantic colors
5. Remind about accessibility (focus states, ARIA labels)
6. Reference the Components page: `/components`

## Visual Reference

Point designers to `/components` page for live examples of all available components.

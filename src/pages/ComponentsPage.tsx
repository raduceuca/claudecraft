import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { CopyCommand } from '@/components/ui/CopyCommand'
import { FilePreview } from '@/components/ui/FilePreview'
import { ThemeSelector } from '@/components/ui/ThemeSelector'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Copy } from 'lucide-react'

function ComponentSection({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mb-16">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-base-content">{title}</h2>
          <p className="text-sm text-base-content/60 mt-1">{description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="btn btn-ghost btn-sm gap-2"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      <div className="bg-base-200 rounded-lg p-6 mb-4">{children}</div>

      {/* Code */}
      <details className="group">
        <summary className="cursor-pointer text-sm text-base-content/50 hover:text-base-content/70 transition-colors">
          View code
        </summary>
        <div className="mt-3">
          <CodeBlock language="tsx">{code}</CodeBlock>
        </div>
      </details>
    </section>
  )
}

export function ComponentsPage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
            <ThemeSelector />
          </div>

          <h1 className="text-3xl font-bold mb-4">Component Showcase</h1>
          <p className="text-base-content/70 text-lg max-w-2xl">
            Visual reference for all available components. Browse, preview, and copy code.
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-12 p-4 bg-base-200 rounded-lg">
          <p className="text-sm text-base-content/50 mb-3">Jump to:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Buttons',
              'Cards',
              'Alerts',
              'Badges',
              'Forms',
              'Modals',
              'Stats',
              'Progress',
              'Tabs',
              'Custom Components',
            ].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(' ', '-')}`}
                className="btn btn-sm btn-ghost"
              >
                {section}
              </a>
            ))}
          </div>
        </nav>

        {/* Buttons */}
        <div id="buttons">
          <ComponentSection
            title="Buttons"
            description="Primary actions and variants. Use Button component for consistent styling."
            code={`import { Button } from '@/components/ui/Button'

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Semantic colors
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>

// Sizes
<Button size="xs">Tiny</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button outline>Outline</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
          >
            <div className="space-y-6">
              {/* Variants */}
              <div>
                <p className="text-sm text-base-content/50 mb-3">Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Semantic */}
              <div>
                <p className="text-sm text-base-content/50 mb-3">Semantic Colors</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="info">Info</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="error">Error</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-sm text-base-content/50 mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">Tiny</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <p className="text-sm text-base-content/50 mb-3">States</p>
                <div className="flex flex-wrap gap-2">
                  <Button outline>Outline</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Cards */}
        <div id="cards">
          <ComponentSection
            title="Cards"
            description="Content containers with optional images and actions."
            code={`// Basic card
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content goes here.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>

// Compact card
<div className="card bg-base-100 shadow-md card-compact">
  <div className="card-body">
    <h3 className="card-title text-sm">Compact Card</h3>
    <p className="text-sm">Less padding for dense UIs.</p>
  </div>
</div>

// Card with border
<div className="card bg-base-100 border border-base-300">
  <div className="card-body">
    <h3 className="card-title">Bordered Card</h3>
    <p>Uses border instead of shadow.</p>
  </div>
</div>`}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Card Title</h2>
                  <p>Card content goes here.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Action</button>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-md card-compact">
                <div className="card-body">
                  <h3 className="card-title text-sm">Compact Card</h3>
                  <p className="text-sm">Less padding for dense UIs.</p>
                </div>
              </div>

              <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title">Bordered Card</h3>
                  <p>Uses border instead of shadow.</p>
                </div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Alerts */}
        <div id="alerts">
          <ComponentSection
            title="Alerts"
            description="Feedback messages for user actions and system status."
            code={`<div className="alert">
  <span>Default alert message.</span>
</div>

<div className="alert alert-info">
  <span>Info: Here's some helpful information.</span>
</div>

<div className="alert alert-success">
  <span>Success! Your action was completed.</span>
</div>

<div className="alert alert-warning">
  <span>Warning: Please review before continuing.</span>
</div>

<div className="alert alert-error">
  <span>Error: Something went wrong.</span>
</div>`}
          >
            <div className="space-y-3">
              <div className="alert">
                <span>Default alert message.</span>
              </div>
              <div className="alert alert-info">
                <span>Info: Here's some helpful information.</span>
              </div>
              <div className="alert alert-success">
                <span>Success! Your action was completed.</span>
              </div>
              <div className="alert alert-warning">
                <span>Warning: Please review before continuing.</span>
              </div>
              <div className="alert alert-error">
                <span>Error: Something went wrong.</span>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Badges */}
        <div id="badges">
          <ComponentSection
            title="Badges"
            description="Labels for counts, status, and categorization."
            code={`// Colors
<span className="badge">Default</span>
<span className="badge badge-primary">Primary</span>
<span className="badge badge-secondary">Secondary</span>
<span className="badge badge-accent">Accent</span>
<span className="badge badge-ghost">Ghost</span>

// Semantic
<span className="badge badge-info">Info</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>

// Sizes
<span className="badge badge-lg">Large</span>
<span className="badge badge-md">Medium</span>
<span className="badge badge-sm">Small</span>
<span className="badge badge-xs">Tiny</span>

// Outline
<span className="badge badge-outline badge-primary">Outline</span>`}
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-base-content/50 mb-3">Colors</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge">Default</span>
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-secondary">Secondary</span>
                  <span className="badge badge-accent">Accent</span>
                  <span className="badge badge-ghost">Ghost</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Semantic</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-info">Info</span>
                  <span className="badge badge-success">Success</span>
                  <span className="badge badge-warning">Warning</span>
                  <span className="badge badge-error">Error</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-lg badge-primary">Large</span>
                  <span className="badge badge-md badge-primary">Medium</span>
                  <span className="badge badge-sm badge-primary">Small</span>
                  <span className="badge badge-xs badge-primary">Tiny</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Outline</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline badge-primary">Primary</span>
                  <span className="badge badge-outline badge-secondary">Secondary</span>
                  <span className="badge badge-outline badge-accent">Accent</span>
                </div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Forms */}
        <div id="forms">
          <ComponentSection
            title="Forms"
            description="Input fields, selects, checkboxes, and form layouts."
            code={`// Text input
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

// Select
<select className="select select-bordered w-full">
  <option disabled selected>Pick one</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

// Checkbox
<label className="label cursor-pointer">
  <span className="label-text">Remember me</span>
  <input type="checkbox" className="checkbox checkbox-primary" />
</label>

// Toggle
<input type="checkbox" className="toggle toggle-primary" />

// Textarea
<textarea
  className="textarea textarea-bordered"
  placeholder="Your message"
/>`}
          >
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full"
                  />
                  <label className="label">
                    <span className="label-text-alt">We'll never share your email</span>
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Pick a framework
                  </option>
                  <option>React</option>
                  <option>Vue</option>
                  <option>Svelte</option>
                </select>

                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Your message..."
                  rows={2}
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text">Checkbox</span>
                </label>

                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="toggle toggle-primary" />
                  <span className="label-text">Toggle</span>
                </label>

                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="radio-example"
                    className="radio radio-primary"
                    defaultChecked
                  />
                  <span className="label-text">Radio</span>
                </label>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Modals */}
        <div id="modals">
          <ComponentSection
            title="Modals"
            description="Dialog overlays for confirmations and focused content."
            code={`// Using dialog element (recommended)
<dialog id="my_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Modal Title</h3>
    <p className="py-4">Modal content goes here.</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

// Open with:
document.getElementById('my_modal').showModal()

// Or use checkbox toggle
<label htmlFor="my-modal" className="btn">Open Modal</label>
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3>Modal Title</h3>
    <p>Content here</p>
  </div>
</div>`}
          >
            <div className="space-y-4">
              <button
                className="btn btn-primary"
                onClick={() =>
                  (document.getElementById('demo_modal') as HTMLDialogElement)?.showModal()
                }
              >
                Open Modal
              </button>

              <dialog id="demo_modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Confirm Action</h3>
                  <p className="py-4">Are you sure you want to proceed? This action cannot be undone.</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-ghost mr-2">Cancel</button>
                      <button className="btn btn-primary">Confirm</button>
                    </form>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <p className="text-sm text-base-content/50">
                Click the button to see the modal in action.
              </p>
            </div>
          </ComponentSection>
        </div>

        {/* Stats */}
        <div id="stats">
          <ComponentSection
            title="Stats"
            description="Display metrics and key numbers."
            code={`<div className="stats shadow">
  <div className="stat">
    <div className="stat-title">Total Users</div>
    <div className="stat-value">89,400</div>
    <div className="stat-desc">21% more than last month</div>
  </div>

  <div className="stat">
    <div className="stat-title">Revenue</div>
    <div className="stat-value text-primary">$25.6K</div>
    <div className="stat-desc text-success">+12%</div>
  </div>

  <div className="stat">
    <div className="stat-title">Tasks Done</div>
    <div className="stat-value text-secondary">86%</div>
    <div className="stat-desc">31 tasks remaining</div>
  </div>
</div>`}
          >
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Users</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-primary">$25.6K</div>
                <div className="stat-desc text-success">+12%</div>
              </div>

              <div className="stat">
                <div className="stat-title">Tasks Done</div>
                <div className="stat-value text-secondary">86%</div>
                <div className="stat-desc">31 tasks remaining</div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Progress */}
        <div id="progress">
          <ComponentSection
            title="Progress"
            description="Progress bars and loading indicators."
            code={`// Progress bar
<progress className="progress w-full" value="40" max="100" />
<progress className="progress progress-primary w-full" value="60" max="100" />
<progress className="progress progress-success w-full" value="80" max="100" />

// Loading spinner
<span className="loading loading-spinner loading-lg" />

// Loading dots
<span className="loading loading-dots loading-lg" />

// Radial progress
<div className="radial-progress" style={{ "--value": 70 }}>70%</div>`}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-base-content/50">Progress Bars</p>
                <progress className="progress w-full" value="40" max="100" />
                <progress className="progress progress-primary w-full" value="60" max="100" />
                <progress className="progress progress-secondary w-full" value="75" max="100" />
                <progress className="progress progress-success w-full" value="90" max="100" />
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Loading Spinners</p>
                <div className="flex gap-4">
                  <span className="loading loading-spinner loading-sm" />
                  <span className="loading loading-spinner loading-md" />
                  <span className="loading loading-spinner loading-lg" />
                  <span className="loading loading-dots loading-lg" />
                  <span className="loading loading-ring loading-lg" />
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Radial Progress</p>
                <div className="flex gap-4">
                  <div
                    className="radial-progress text-primary"
                    style={{ '--value': 25 } as React.CSSProperties}
                    role="progressbar"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    25%
                  </div>
                  <div
                    className="radial-progress text-secondary"
                    style={{ '--value': 50 } as React.CSSProperties}
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    50%
                  </div>
                  <div
                    className="radial-progress text-success"
                    style={{ '--value': 75 } as React.CSSProperties}
                    role="progressbar"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    75%
                  </div>
                </div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Tabs */}
        <div id="tabs">
          <ComponentSection
            title="Tabs"
            description="Navigation between related content sections."
            code={`// Boxed tabs
<div role="tablist" className="tabs tabs-boxed">
  <button role="tab" className="tab">Tab 1</button>
  <button role="tab" className="tab tab-active">Tab 2</button>
  <button role="tab" className="tab">Tab 3</button>
</div>

// Bordered tabs
<div role="tablist" className="tabs tabs-bordered">
  <button role="tab" className="tab">Tab 1</button>
  <button role="tab" className="tab tab-active">Tab 2</button>
  <button role="tab" className="tab">Tab 3</button>
</div>

// Lifted tabs
<div role="tablist" className="tabs tabs-lifted">
  <button role="tab" className="tab">Tab 1</button>
  <button role="tab" className="tab tab-active">Tab 2</button>
  <button role="tab" className="tab">Tab 3</button>
</div>`}
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-base-content/50 mb-3">Boxed</p>
                <div role="tablist" className="tabs tabs-boxed">
                  <button role="tab" className="tab">
                    Tab 1
                  </button>
                  <button role="tab" className="tab tab-active">
                    Tab 2
                  </button>
                  <button role="tab" className="tab">
                    Tab 3
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Bordered</p>
                <div role="tablist" className="tabs tabs-bordered">
                  <button role="tab" className="tab">
                    Tab 1
                  </button>
                  <button role="tab" className="tab tab-active">
                    Tab 2
                  </button>
                  <button role="tab" className="tab">
                    Tab 3
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/50 mb-3">Lifted</p>
                <div role="tablist" className="tabs tabs-lifted">
                  <button role="tab" className="tab">
                    Tab 1
                  </button>
                  <button role="tab" className="tab tab-active">
                    Tab 2
                  </button>
                  <button role="tab" className="tab">
                    Tab 3
                  </button>
                </div>
              </div>
            </div>
          </ComponentSection>
        </div>

        {/* Custom Components */}
        <div id="custom-components">
          <h2 className="text-2xl font-bold mb-8 pt-8 border-t border-base-300">
            Custom Components
          </h2>
          <p className="text-base-content/70 mb-8">
            These components are built for claudecraft. Use them instead of creating new ones.
          </p>

          {/* CodeBlock */}
          <ComponentSection
            title="CodeBlock"
            description="Syntax-highlighted code display with copy button."
            code={`import { CodeBlock } from '@/components/ui/CodeBlock'

<CodeBlock language="typescript">
{\`const greeting = "Hello, world!"
console.log(greeting)\`}
</CodeBlock>

// Without language label
<CodeBlock>
{\`npm install something\`}
</CodeBlock>`}
          >
            <div className="space-y-4">
              <CodeBlock language="typescript">{`const greeting = "Hello, world!"
console.log(greeting)`}</CodeBlock>
              <CodeBlock>{`npm install something`}</CodeBlock>
            </div>
          </ComponentSection>

          {/* CopyCommand */}
          <ComponentSection
            title="CopyCommand"
            description="Inline command with one-click copy."
            code={`import { CopyCommand } from '@/components/ui/CopyCommand'

<CopyCommand>bun create claudecraft my-app</CopyCommand>
<CopyCommand>npm install</CopyCommand>
<CopyCommand>git push origin main</CopyCommand>`}
          >
            <div className="space-y-3">
              <div>
                <CopyCommand>bun create claudecraft my-app</CopyCommand>
              </div>
              <div>
                <CopyCommand>npm install</CopyCommand>
              </div>
              <div>
                <CopyCommand>git push origin main</CopyCommand>
              </div>
            </div>
          </ComponentSection>

          {/* FilePreview */}
          <ComponentSection
            title="FilePreview"
            description="Expandable file content preview with filename and description."
            code={`import { FilePreview } from '@/components/ui/FilePreview'

<FilePreview
  filename="config.ts"
  description="Application configuration"
  content={\`export const config = {
  port: 3000,
  debug: true
}\`}
  language="typescript"
/>`}
          >
            <FilePreview
              filename="config.ts"
              description="Application configuration"
              content={`export const config = {
  port: 3000,
  debug: true
}`}
              language="typescript"
            />
          </ComponentSection>

          {/* Button */}
          <ComponentSection
            title="Button (Custom Wrapper)"
            description="DaisyUI button with typed variants, sizes, and loading state."
            code={`import { Button } from '@/components/ui/Button'

// Props interface
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  loading?: boolean
}

// Usage
<Button variant="primary" size="md">Click me</Button>
<Button variant="success" loading>Saving...</Button>
<Button variant="error" outline>Delete</Button>`}
          >
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="success" loading>
                Saving...
              </Button>
              <Button variant="error" outline>
                Delete
              </Button>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </div>
          </ComponentSection>

          {/* ThemeSelector */}
          <ComponentSection
            title="ThemeSelector"
            description="Dropdown for switching between 32 DaisyUI themes."
            code={`import { ThemeSelector } from '@/components/ui/ThemeSelector'

// Just drop it in - uses ThemeContext internally
<ThemeSelector />

// To use theme programmatically:
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, setTheme, themes } = useTheme()
  // themes is array of all 32 theme names
}`}
          >
            <div className="flex items-center gap-4">
              <ThemeSelector />
              <span className="text-sm text-base-content/50">
                Try switching themes - all components update instantly
              </span>
            </div>
          </ComponentSection>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-base-300 text-center">
          <p className="text-sm text-base-content/50">
            See the{' '}
            <a
              href="https://daisyui.com/components/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              full DaisyUI docs
            </a>{' '}
            for more components
          </p>
          <Link to="/" className="btn btn-ghost btn-sm mt-4">
            Back to Home
          </Link>
        </footer>
      </div>
    </div>
  )
}

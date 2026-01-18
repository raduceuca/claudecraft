import { Link } from 'react-router-dom'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { ThemeSelector } from '@/components/ui/ThemeSelector'
import { ArrowLeft, Check, X } from 'lucide-react'

function PatternSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-base-content/60 mb-6">{description}</p>
      {children}
    </section>
  )
}

function DoExample({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-success pl-4 py-2">
      <div className="flex items-center gap-2 text-success font-medium mb-2">
        <Check className="size-4" />
        Do
      </div>
      {children}
    </div>
  )
}

function DontExample({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-error pl-4 py-2">
      <div className="flex items-center gap-2 text-error font-medium mb-2">
        <X className="size-4" />
        Don't
      </div>
      {children}
    </div>
  )
}

export function PatternsPage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost btn-sm gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Link>
            <ThemeSelector />
          </div>

          <h1 className="text-3xl font-bold mb-4">Design Patterns</h1>
          <p className="text-base-content/70 text-lg max-w-2xl">
            Guidelines for making good design decisions when building with Claude Code.
            Reference this when choosing components or structuring layouts.
          </p>
        </header>

        {/* When to Use What */}
        <PatternSection
          title="Choosing Components"
          description="Pick the right component for your use case."
        >
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>You Need</th>
                  <th>Use This</th>
                  <th>Not This</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Main page action</td>
                  <td>
                    <code className="text-primary">btn btn-primary</code>
                  </td>
                  <td className="text-base-content/50">Multiple primary buttons</td>
                </tr>
                <tr>
                  <td>Group related content</td>
                  <td>
                    <code className="text-primary">card</code>
                  </td>
                  <td className="text-base-content/50">Bare divs with borders</td>
                </tr>
                <tr>
                  <td>Full-width marketing banner</td>
                  <td>
                    <code className="text-primary">hero</code>
                  </td>
                  <td className="text-base-content/50">Large card stretched</td>
                </tr>
                <tr>
                  <td>User feedback message</td>
                  <td>
                    <code className="text-primary">alert</code>
                  </td>
                  <td className="text-base-content/50">Colored div with text</td>
                </tr>
                <tr>
                  <td>Count or label</td>
                  <td>
                    <code className="text-primary">badge</code>
                  </td>
                  <td className="text-base-content/50">Span with background</td>
                </tr>
                <tr>
                  <td>Key metrics display</td>
                  <td>
                    <code className="text-primary">stat</code>
                  </td>
                  <td className="text-base-content/50">Custom metric cards</td>
                </tr>
                <tr>
                  <td>Navigation between views</td>
                  <td>
                    <code className="text-primary">tabs</code>
                  </td>
                  <td className="text-base-content/50">Button group styled as tabs</td>
                </tr>
                <tr>
                  <td>Async operation feedback</td>
                  <td>
                    <code className="text-primary">loading</code>
                  </td>
                  <td className="text-base-content/50">Custom spinner</td>
                </tr>
                <tr>
                  <td>Confirmation dialog</td>
                  <td>
                    <code className="text-primary">modal</code>
                  </td>
                  <td className="text-base-content/50">Inline expand/collapse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </PatternSection>

        {/* Layout Patterns */}
        <PatternSection
          title="Layout Patterns"
          description="Common page structures and when to use each."
        >
          <div className="space-y-8">
            {/* Marketing/Landing */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Marketing / Landing Page</h3>
              <p className="text-sm text-base-content/60 mb-4">
                Hero section, feature grid, testimonials, CTA. Use for product pages,
                homepages, or any page meant to convert visitors.
              </p>
              <CodeBlock language="tsx">{`<div className="min-h-dvh">
  {/* Hero */}
  <section className="hero min-h-[60vh] bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-balance">Headline</h1>
        <p className="py-6 text-pretty">Value proposition</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </section>

  {/* Features */}
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
      {/* Feature cards */}
    </div>
  </section>
</div>`}</CodeBlock>
            </div>

            {/* Dashboard */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Dashboard / Admin</h3>
              <p className="text-sm text-base-content/60 mb-4">
                Sidebar navigation, stats, tables, forms. Use for internal tools,
                admin panels, or data-heavy applications.
              </p>
              <CodeBlock language="tsx">{`<div className="drawer lg:drawer-open">
  <input id="drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content p-6">
    {/* Stats row */}
    <div className="stats shadow mb-6">
      <div className="stat">
        <div className="stat-title">Users</div>
        <div className="stat-value">89K</div>
      </div>
    </div>

    {/* Main content: tables, forms, etc */}
  </div>
  <div className="drawer-side">
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      <li><a>Dashboard</a></li>
      <li><a>Settings</a></li>
    </ul>
  </div>
</div>`}</CodeBlock>
            </div>

            {/* Content/Blog */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Content / Blog</h3>
              <p className="text-sm text-base-content/60 mb-4">
                Centered content, readable width, article styling. Use for blog posts,
                documentation, or long-form content.
              </p>
              <CodeBlock language="tsx">{`<article className="min-h-dvh bg-base-100">
  <div className="max-w-2xl mx-auto px-6 py-20">
    <h1 className="text-4xl font-bold mb-4 text-balance">
      Article Title
    </h1>
    <p className="text-base-content/60 mb-8">
      Published on Jan 1, 2024
    </p>

    {/* Content with prose class for typography */}
    <div className="prose prose-lg">
      <p>Article content...</p>
    </div>
  </div>
</article>`}</CodeBlock>
            </div>
          </div>
        </PatternSection>

        {/* Spacing */}
        <PatternSection
          title="Spacing Scale"
          description="Use consistent spacing throughout your UI."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-3">Tailwind Spacing Reference</h3>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Size</th>
                    <th>Use For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>p-1</code> / <code>gap-1</code></td>
                    <td>4px</td>
                    <td>Icon padding, tight groups</td>
                  </tr>
                  <tr>
                    <td><code>p-2</code> / <code>gap-2</code></td>
                    <td>8px</td>
                    <td>Button padding, inline elements</td>
                  </tr>
                  <tr>
                    <td><code>p-4</code> / <code>gap-4</code></td>
                    <td>16px</td>
                    <td>Card padding, form groups</td>
                  </tr>
                  <tr>
                    <td><code>p-6</code> / <code>gap-6</code></td>
                    <td>24px</td>
                    <td>Section padding, card grids</td>
                  </tr>
                  <tr>
                    <td><code>p-8</code> / <code>gap-8</code></td>
                    <td>32px</td>
                    <td>Page sections</td>
                  </tr>
                  <tr>
                    <td><code>py-20</code></td>
                    <td>80px</td>
                    <td>Major sections, page margins</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-medium mb-3">Spacing Guidelines</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="size-4 text-success mt-0.5" />
                  <span>Use <code>gap</code> in flex/grid instead of margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 text-success mt-0.5" />
                  <span>Keep spacing consistent within components</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 text-success mt-0.5" />
                  <span>Larger spacing between sections, smaller within</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="size-4 text-error mt-0.5" />
                  <span>Don't use arbitrary values like <code>p-[13px]</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="size-4 text-error mt-0.5" />
                  <span>Don't mix spacing units randomly</span>
                </li>
              </ul>
            </div>
          </div>
        </PatternSection>

        {/* Typography */}
        <PatternSection
          title="Typography"
          description="Text styling for readability and hierarchy."
        >
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3">Type Scale</h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">Page Title (text-4xl)</div>
                  <div className="text-2xl font-semibold">Section Title (text-2xl)</div>
                  <div className="text-lg font-medium">Subsection (text-lg)</div>
                  <div className="text-base">Body text (text-base)</div>
                  <div className="text-sm text-base-content/60">
                    Secondary text (text-sm + opacity)
                  </div>
                  <div className="text-xs text-base-content/40">Caption (text-xs)</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Typography Rules</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-success mt-0.5" />
                    <span>
                      Use <code>text-balance</code> for headings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-success mt-0.5" />
                    <span>
                      Use <code>text-pretty</code> for body paragraphs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-success mt-0.5" />
                    <span>
                      Use <code>tabular-nums</code> for numbers in tables
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-success mt-0.5" />
                    <span>Max width 65-75 characters for readable paragraphs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="size-4 text-error mt-0.5" />
                    <span>Don't use more than 3 font weights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </PatternSection>

        {/* Color Usage */}
        <PatternSection
          title="Color Usage"
          description="Use semantic colors, not arbitrary hex values."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <DoExample>
              <CodeBlock language="tsx">{`// Semantic colors adapt to theme
<div className="bg-base-100">
  <p className="text-base-content">Main text</p>
  <p className="text-base-content/60">Secondary</p>
  <button className="btn btn-primary">Action</button>
</div>`}</CodeBlock>
            </DoExample>

            <DontExample>
              <CodeBlock language="tsx">{`// Hardcoded colors break theming
<div className="bg-white">
  <p className="text-gray-900">Main text</p>
  <p className="text-[#666]">Secondary</p>
  <button className="bg-blue-500">Action</button>
</div>`}</CodeBlock>
            </DontExample>
          </div>

          <div className="mt-6 bg-base-200 rounded-lg p-6">
            <h3 className="font-medium mb-3">Semantic Color Reference</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">Backgrounds</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>bg-base-100</code> - Main background
                  </li>
                  <li>
                    <code>bg-base-200</code> - Cards, sections
                  </li>
                  <li>
                    <code>bg-base-300</code> - Borders, dividers
                  </li>
                  <li>
                    <code>bg-primary</code> - Primary accent areas
                  </li>
                  <li>
                    <code>bg-neutral</code> - Headers, footers
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Text</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>text-base-content</code> - Primary text
                  </li>
                  <li>
                    <code>text-base-content/60</code> - Secondary text
                  </li>
                  <li>
                    <code>text-base-content/40</code> - Tertiary/disabled
                  </li>
                  <li>
                    <code>text-primary</code> - Links, accents
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </PatternSection>

        {/* Do/Don't Examples */}
        <PatternSection
          title="Common Mistakes"
          description="Patterns to follow and patterns to avoid."
        >
          <div className="space-y-8">
            {/* Shadows */}
            <div className="grid gap-6 md:grid-cols-2">
              <DoExample>
                <p className="text-sm mb-2">Use subtle shadows</p>
                <div className="card bg-base-100 shadow-md p-4">
                  <p className="text-sm">Card with shadow-md</p>
                </div>
              </DoExample>
              <DontExample>
                <p className="text-sm mb-2">Avoid heavy shadows</p>
                <div className="card bg-base-100 shadow-2xl p-4">
                  <p className="text-sm">Card with shadow-2xl</p>
                </div>
              </DontExample>
            </div>

            {/* Gradients */}
            <div className="grid gap-6 md:grid-cols-2">
              <DoExample>
                <p className="text-sm mb-2">Solid colors or subtle tints</p>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm">Subtle primary tint</p>
                </div>
              </DoExample>
              <DontExample>
                <p className="text-sm mb-2">Decorative gradients</p>
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg p-4">
                  <p className="text-sm text-white">Rainbow gradient</p>
                </div>
              </DontExample>
            </div>

            {/* Buttons */}
            <div className="grid gap-6 md:grid-cols-2">
              <DoExample>
                <p className="text-sm mb-2">One primary button per view</p>
                <div className="flex gap-2">
                  <button className="btn btn-primary">Save</button>
                  <button className="btn btn-ghost">Cancel</button>
                </div>
              </DoExample>
              <DontExample>
                <p className="text-sm mb-2">Multiple competing primary buttons</p>
                <div className="flex gap-2">
                  <button className="btn btn-primary">Save</button>
                  <button className="btn btn-primary">Submit</button>
                  <button className="btn btn-primary">Continue</button>
                </div>
              </DontExample>
            </div>

            {/* Empty states */}
            <div className="grid gap-6 md:grid-cols-2">
              <DoExample>
                <p className="text-sm mb-2">Clear next action</p>
                <div className="text-center py-8 bg-base-200 rounded-lg">
                  <p className="text-base-content/60 mb-4">No items yet</p>
                  <button className="btn btn-primary btn-sm">Create First Item</button>
                </div>
              </DoExample>
              <DontExample>
                <p className="text-sm mb-2">Just showing "empty"</p>
                <div className="text-center py-8 bg-base-200 rounded-lg">
                  <p className="text-base-content/40">No items</p>
                </div>
              </DontExample>
            </div>
          </div>
        </PatternSection>

        {/* Accessibility Quick Checks */}
        <PatternSection
          title="Accessibility Checklist"
          description="Quick checks before shipping."
        >
          <div className="bg-base-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>
                  All interactive elements have visible <strong>focus states</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>
                  Icon-only buttons have <code>aria-label</code>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>Form inputs have associated labels</span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>Color contrast meets 4.5:1 for text</span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>Touch targets are at least 44x44px</span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>Page has a logical heading hierarchy (h1, h2, h3...)</span>
              </li>
              <li className="flex items-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm mt-0.5" />
                <span>
                  Using <code>min-h-dvh</code> not <code>min-h-screen</code>
                </span>
              </li>
            </ul>
          </div>
        </PatternSection>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-base-300 flex items-center justify-between">
          <div className="flex gap-4">
            <Link to="/components" className="btn btn-ghost btn-sm">
              Component Showcase
            </Link>
            <Link to="/" className="btn btn-ghost btn-sm">
              Home
            </Link>
          </div>
          <p className="text-sm text-base-content/50">
            Reference the{' '}
            <a
              href="https://daisyui.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              DaisyUI docs
            </a>{' '}
            for more
          </p>
        </footer>
      </div>
    </div>
  )
}

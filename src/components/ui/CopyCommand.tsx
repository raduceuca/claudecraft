import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { trackEvent } from '@/lib/clarity'

interface CopyCommandProps {
  children: string
}

export function CopyCommand({ children }: CopyCommandProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    // Track the copy event with a sanitized command name
    const commandName = children.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')
    trackEvent(`copy_${commandName}`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 text-left"
      aria-label={`Copy command: ${children}`}
    >
      <code
        className="font-mono text-sm px-2.5 py-1.5 rounded-r border-l-2 border-l-primary/50 border-y border-r border-base-content/10 group-hover:border-base-content/15 transition-colors text-base-content"
        style={{
          background: `
            radial-gradient(circle, oklch(var(--bc) / 0.03) 0.5px, transparent 0.5px),
            oklch(var(--b2) / 0.7)
          `,
          backgroundSize: '8px 8px, 100% 100%',
        }}
      >
        {children}
      </code>
      <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
        {copied ? (
          <Check className="size-3.5 text-success" />
        ) : (
          <Copy className="size-3.5 text-base-content/40" />
        )}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}

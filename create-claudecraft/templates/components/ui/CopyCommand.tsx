import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyCommandProps {
  children: string
}

export function CopyCommand({ children }: CopyCommandProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 text-left"
      aria-label={`Copy command: ${children}`}
    >
      <code className="font-mono text-sm bg-base-200/60 px-2 py-1 rounded border border-base-300/50 group-hover:border-base-300 group-focus-visible:border-base-300">
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

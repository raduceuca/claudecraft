import { useState, useId } from 'react'
import { trackEvent } from '@/lib/clarity'

interface FilePreviewProps {
  filename: string
  description: string
  content: string
  language?: string
}

export function FilePreview({ filename, description, content, language = 'markdown' }: FilePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  const handleToggle = () => {
    if (!isOpen) {
      // Track file preview open
      const safeName = filename.replace(/[^a-zA-Z0-9]/g, '_')
      trackEvent(`preview_${safeName}`)
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="border border-base-300 rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-base-200 transition-colors text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div>
          <div className="font-mono text-sm font-medium">{filename}</div>
          <div className="text-xs text-base-content/50 mt-1">{description}</div>
        </div>
        <svg
          className={`w-5 h-5 text-base-content/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div id={panelId} className="border-t border-base-300 bg-base-200 p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-base-content/80 whitespace-pre-wrap">
            <code className={`language-${language}`}>{content}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

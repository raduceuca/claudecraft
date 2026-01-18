// ASCII art generated with figlet 'ANSI Shadow' font

// Get today's date in format YYYY.MM.DD
const today = new Date().toISOString().split('T')[0].replace(/-/g, '.')

// Monospace font stack that handles box drawing well
const monoFont = 'ui-monospace, "SF Mono", "Cascadia Code", "Fira Code", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

export function TerminalHeader() {
  return (
    <div className="rounded-lg overflow-hidden border border-base-300 bg-base-200 shadow-lg mb-12">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-base-300 border-b border-base-300">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-error/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <span
          className="text-sm text-base-content/40 ml-2"
          style={{ fontFamily: monoFont }}
        >
          Terminal — bun create claudecraft
        </span>
      </div>

      {/* Terminal content wrapper - handles scaling on mobile */}
      <div className="terminal-content-wrapper">
        <div
          className="terminal-content p-4 md:p-6"
          style={{ fontFamily: monoFont }}
        >
        {/* ASCII Art - using dangerouslySetInnerHTML to preserve exact spacing */}
        <pre
          className="mb-6"
          style={{ lineHeight: 1.1 }}
          dangerouslySetInnerHTML={{
            __html: `<span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">██████╗ ██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝</span>
<span class="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">██████╗ ██████╗  █████╗ ███████╗████████╗
██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██║     ██████╔╝███████║█████╗     ██║
██║     ██╔══██╗██╔══██║██╔══╝     ██║
╚██████╗██║  ██║██║  ██║██║        ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝</span>`
          }}
        />

        {/* Status bar */}
        <div className="flex items-center gap-4 text-base-content/40 text-sm" style={{ fontFamily: monoFont }}>
          <span>
            <span className="text-cyan-400">■</span> C{' '}
            <span className="text-fuchsia-400">■</span> M{' '}
            <span className="text-yellow-400">■</span> Y{' '}
            <span className="text-white/60">■</span> K
          </span>
          <span className="text-base-content/20">|</span>
          <span className="text-success">REV 1.0.0</span>
          <span className="text-base-content/20">|</span>
          <span>{today}</span>
          <span className="text-base-content/20">|</span>
          <span className="text-warning">WORKS ON MAC</span>
        </div>
        </div>
      </div>
    </div>
  )
}

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
          className="text-xs text-base-content/40 ml-2"
          style={{ fontFamily: monoFont }}
        >
          Terminal — bun create claudecraft
        </span>
      </div>

      {/* Terminal content */}
      <div
        className="p-6 text-xs leading-none overflow-x-auto"
        style={{ fontFamily: monoFont }}
      >
        {/* ASCII Art - using dangerouslySetInnerHTML to preserve exact spacing */}
        <pre
          className="mb-6"
          style={{ lineHeight: 1.1 }}
          dangerouslySetInnerHTML={{
            __html: `<span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝</span>
<span class="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">██████╗██████╗  █████╗ ███████╗████████╗
██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██║     ██████╔╝███████║█████╗     ██║
██║     ██╔══██╗██╔══██║██╔══╝     ██║
╚██████╗██║  ██║██║  ██║██║        ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝</span>`
          }}
        />

        {/* Status bar */}
        <div className="flex items-center gap-6 text-base-content/40 mb-6 text-[10px]">
          <span>
            <span className="text-cyan-400">■</span> C{' '}
            <span className="text-fuchsia-400">■</span> M{' '}
            <span className="text-yellow-400">■</span> Y{' '}
            <span className="text-white">■</span> K
          </span>
          <span className="text-success">REV 1.0.0</span>
          <span>{today}</span>
          <span className="text-warning">WORKS ON MAC</span>
        </div>

        {/* Manifest box - single pre block for perfect alignment */}
        <pre className="text-base-content/50 text-[10px]" style={{ lineHeight: 1.4 }}>
{`╭──────────────────────────────────────────────────────────────────╮
│ `}<span className="text-base-content/40">SPECS ·</span>{` `}<span className="text-base-content/70">Your taste. Their labor. Finally.</span>{`                       │
├─── STACK ───────────────┬─── ASSETS ───────────┬─── DEFAULTS ────────┤
│ `}<span className="text-base-content/40">react      </span><span className="text-primary">18.x       </span>{`│ `}<span className="text-base-content/40">skills    </span><span className="text-primary">27        </span>{`│ `}<span className="text-base-content/40">theme     </span><span className="text-primary">halloween </span>{`│
│ `}<span className="text-base-content/40">typescript </span><span className="text-primary">5.x        </span>{`│ `}<span className="text-base-content/40">commands  </span><span className="text-primary">7         </span>{`│ `}<span className="text-base-content/40">port      </span><span className="text-primary">6969      </span>{`│
│ `}<span className="text-base-content/40">vite       </span><span className="text-primary">5.x        </span>{`│ `}<span className="text-base-content/40">themes    </span><span className="text-primary">32        </span>{`│ `}<span className="text-base-content/40">tests     </span><span className="text-primary">vitest    </span>{`│
│ `}<span className="text-base-content/40">tailwind   </span><span className="text-primary">3.x        </span>{`│ `}<span className="text-base-content/40">hooks     </span><span className="text-primary">2         </span>{`│ `}<span className="text-base-content/40">pkg       </span><span className="text-primary">bun       </span>{`│
│ `}<span className="text-base-content/40">daisyui    </span><span className="text-primary">4.x        </span>{`│ `}<span className="text-base-content/40">comps     </span><span className="text-primary">6         </span>{`│ `}<span className="text-base-content/40">license   </span><span className="text-primary">MIT       </span>{`│
├─────────────────────────┴───────────────────────┴─────────────────────┤
│ `}<span className="text-base-content/40">~48 files · 0 deps · </span><span className="text-primary">/help</span><span className="text-base-content/40"> for existential guidance</span>{`                  │
╰──────────────────────────────────────────────────────────────────╯`}
        </pre>
      </div>
    </div>
  )
}

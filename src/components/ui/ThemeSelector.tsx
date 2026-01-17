import { useTheme, Theme } from '@/context/ThemeContext'
import { Palette } from 'lucide-react'

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" aria-label="Select theme" className="btn btn-ghost gap-2">
        <Palette className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">Theme</span>
        <svg
          className="size-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
          aria-hidden="true"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 text-base-content rounded-box z-50 w-52 max-h-96 overflow-y-auto p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li key={t}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={t}
              value={t}
              checked={theme === t}
              onChange={() => setTheme(t as Theme)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

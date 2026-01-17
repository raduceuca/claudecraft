import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export const THEMES = [
  // Light themes
  'light', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'garden',
  'lofi', 'pastel', 'fantasy', 'wireframe', 'cmyk', 'autumn',
  'acid', 'lemonade', 'winter', 'nord',
  // Dark themes
  'dark', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween',
  'aqua', 'forest', 'black', 'luxury', 'dracula', 'business',
  'night', 'coffee', 'dim', 'sunset',
  // Custom
  'custom',
] as const

export type Theme = typeof THEMES[number]

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: readonly Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'app-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && THEMES.includes(stored)) {
        return stored
      }
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

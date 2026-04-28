import { useEffect, useState } from "react"
import { ThemeContext } from "./useTheme"

type Theme = "light" | "dark"

export interface ThemeContextValue {
  theme: Theme,
  toggleTheme: () => void
}

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement

    if(theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
import { useEffect, useState } from "react"
import { ThemeContext } from "./useTheme"

type Theme = "light" | "dark" | "system"

export interface ThemeContextValue {
  theme: Theme,
  setTheme: (theme: Theme) => void,
  resolvedTheme: Omit<Theme, "system">
}

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme") as Theme
  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
    return savedTheme
  }
  return "system"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  const resolvedTheme = theme === "system" ? systemTheme : theme

  // Update DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark")
  }, [resolvedTheme])

  // Listen to system changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mq.addEventListener("change", handleChange)
    return () => mq.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
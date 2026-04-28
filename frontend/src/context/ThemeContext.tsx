import { useCallback, useEffect, useState } from "react"
import { ThemeContext } from "./useTheme"

type Theme = "light" | "dark" | "system"

export interface ThemeContextValue {
  theme: Theme,
  setTheme: (theme: Theme) => void
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

  const updateDOM = useCallback((targetTheme: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", targetTheme === "dark")
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)

    if (theme !== "system") {
      updateDOM(theme)
      return
    }

    updateDOM(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  }, [theme, updateDOM])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        updateDOM(e.matches ? "dark" : "light")
      }
    }

    mq.addEventListener("change", handleChange)
    return () => mq.removeEventListener("change", handleChange)
  }, [theme, updateDOM])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
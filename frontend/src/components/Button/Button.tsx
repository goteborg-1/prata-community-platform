import type { ButtonHTMLAttributes } from "react"
import s from "./Button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  onClick: () => void,
  variant?: "primary" | "secondary" | "transparent"
  size?: "normal" | "small" | "x-small"
}

export default function Button({variant = "primary", size = "normal", onClick, children}: ButtonProps) {
  return(
    <button
      className={`${s.base} ${s[size]} ${s[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
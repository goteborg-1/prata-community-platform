import s from "./Card.module.css"

interface CardProps {
  variant?: "transparent" | "neutral"
  children: React.ReactNode
}

export default function Card({variant = "transparent", children}: CardProps) {
  return(
    <div className={`${s.card} ${s[variant]}`}>
      {children}
    </div>
  )
}
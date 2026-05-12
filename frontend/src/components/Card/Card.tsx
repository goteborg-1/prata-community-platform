import s from "./Card.module.css"

interface CardProps {
  variant?: "transparent" | "neutral"
  isClickable?: boolean,
  onClick?: () => void,
  children: React.ReactNode
}

export default function Card({variant = "transparent", isClickable = false, onClick, children}: CardProps) {
  return(
    <div 
      className={`${s.card} ${s[variant]} ${isClickable ? s.isClickable : ""}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  )
}
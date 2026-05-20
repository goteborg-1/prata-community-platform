import s from "./Card.module.css"

interface CardProps {
  center?: boolean,
  horizontal?: boolean,
  isClickable?: boolean,
  onClick?: () => void,
  children: React.ReactNode
}

export default function Card({center = false, horizontal = false, isClickable = false, onClick, children}: CardProps) {
  return(
    <div 
      className={`${s.card} ${center ? s.center : ""} ${isClickable ? s.isClickable : ""} ${horizontal ? s.horizontal : ""}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  )
}
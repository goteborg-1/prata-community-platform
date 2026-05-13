import s from "./Avatar.module.css"

interface Props {
  displayName: string
  color: string
  size?: "small" | "medium" | "large"
  isAnonymous?: boolean,
  onClick?: () => void,
}

export default function Avatar({ displayName, color, size = "medium", isAnonymous = false, onClick }: Props) {
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div 
      className={`${s.avatar} ${s[size]} ${onClick ? s.clickable : ""}`} 
      style={{ backgroundColor: color }} 
      onClick={onClick} 
      role={onClick ? "button" : undefined}
    >
      <span className={s.initial}>{isAnonymous ? "A" : initial}</span>
    </div>
  )
}
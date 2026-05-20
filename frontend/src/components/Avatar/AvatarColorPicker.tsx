import { AVATAR_COLORS, type AvatarColor } from "@shared"
import s from "./AvatarColorPicker.module.css"

interface Props {
  value: string
  onChange: (color: AvatarColor) => void
}

export default function AvatarColorPicker({ value, onChange }: Props) {
  return (
    <div className={s.picker}>
      {AVATAR_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`${s.swatch} ${value === color ? s.selected : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={color}
        />
      ))}
    </div>
  )
}
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import Avatar from "./Avatar"
import s from "./AvatarMenu.module.css"

export default function AvatarMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  if (!user) return null

  const go = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <div className={s.wrap} ref={menuRef}>
      <Avatar
        displayName={user.displayName!}
        color={user.avatarColor}
        size="small"
        onClick={() => setOpen(v => !v)}
      />
      {open && (
        <div className={s.dropdown}>
          <div className={s.userInfo}>
            <p className={s.name}>{user.displayName}</p>
            <p className={s.handle}>@{user.handle}</p>
          </div>
          <div className={s.sep} />
          <button className={s.item} onClick={() => go("/profil")}>Profil</button>
          <button className={s.item} onClick={() => go("/installningar")}>Inställningar</button>
          <div className={s.sep} />
          <button className={`${s.item} ${s.danger}`} onClick={logout}>Logga ut</button>
        </div>
      )}
    </div>
  )
}
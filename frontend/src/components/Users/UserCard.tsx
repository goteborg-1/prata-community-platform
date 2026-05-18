import { useState } from "react"
import type { User } from "@shared"
import { useDeleteUser, useUpdateUserRole } from "../../hooks/useAdminUsers"
import Avatar from "../Avatar/Avatar"
import Card from "../Card/Card"
import s from "./UserCard.module.css"
import Button from "../Button/Button"

const ROLE_LABELS: Record<User["role"], string> = {
  admin: "Admin",
  psychologist: "Psykolog",
  user: "Användare",
}

interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const { mutate: deleteUser } = useDeleteUser()
  const { mutate: updateRole } = useUpdateUserRole()

  const handleRoleChange = (role: User["role"]) => {
    updateRole({ id: user.id, role })
    setMenuOpen(false)
  }

  const handleDelete = () => {
    if(window.confirm(`Är du helt säker på att du vill ta bort användare ${user.displayName}? Denna åtgärd går inte att ångra.`)) {
      deleteUser(user.id)
      setMenuOpen(false)
    }
  }

  return (
    <Card horizontal>
      <Avatar displayName={user.displayName!} color={user.avatarColor} />

      <div className={s.info}>
        <div className={s.nameRow}>
          <span className={s.name}>{user.displayName}</span>
          <span className={`${s.badge} ${s[user.role]}`}>
            {ROLE_LABELS[user.role]}
          </span>
        </div>
        <span className={s.email}>{user.email}</span>
        <span className={s.date}>
          Registrerad {new Date(user.createdAt).toLocaleDateString("sv-SE", {
            year: "numeric", month: "short", day: "numeric"
          })}
        </span>
      </div>

      <div className={s.menuWrapper}>
        <Button
          variant="transparent"
          size="small"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Öppna meny"
        >
          ···
        </Button>

        {menuOpen && (
          <>
            <div className={s.backdrop} onClick={() => setMenuOpen(false)} />
            <div className={s.dropdown}>
              <span className={s.subLabel}>Byt roll</span>
              {(["user", "psychologist", "admin"] as User["role"][]).map(role => (
                <button
                  key={role}
                  className={s.dropItem}
                  onClick={() => handleRoleChange(role)}
                >
                  <span className={s.checkIcon}>
                    {user.role === role ? "✓" : ""}
                  </span>
                  {ROLE_LABELS[role]}
                </button>
              ))}
              <div className={s.separator} />
              <button className={`${s.dropItem} ${s.danger}`} onClick={handleDelete}>
                <i className="ti ti-trash" aria-hidden="true" />
                Ta bort användare
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
import { useState, useEffect } from "react"
import { useAdminUsers } from "../../hooks/useAdminUsers"
import Container from "../../components/Container/Container"
import Input from "../../components/Input/Input"
import UserCard from "../../components/Users/UserCard"
import PaginationBase from "../../components/Pagination/PaginationBase"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import s from "./Users.module.css"
import p from "../../components/Posts/CreatePost/CreatePost.module.css"

const AVAILABLE_ROLES = [
  { value: "user", label: "Användare" },
  { value: "psychologist", label: "Psykolog" },
  { value: "admin", label: "Admin" },
] as const

type RoleType = typeof AVAILABLE_ROLES[number]["value"]

export default function Users() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>(["user", "admin", "psychologist"])
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading } = useAdminUsers({ 
    search: debouncedSearch, 
    page, 
    limit, 
    role: selectedRoles.length > 0 ? selectedRoles : undefined
  })

  const users = data?.data
  const totalPages = data?.meta.totalPages ?? 0

  const toggleRole = (role: RoleType) => {
    setPage(1)
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    )
  }

  return (
    <Container color="secondary">
      <div>
        <h2>Användare</h2>
        {data?.meta.total !== undefined && (
          <span className={s.count}>{data.meta.total} användare</span>
        )}
      </div>

      <div className={s.filters}>
        <Input
          variant="neutral"
          placeholder="Sök användare..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        <div className={s.buttonRow}>
          {AVAILABLE_ROLES.map((role) => (
            <button
              key={role.value}
              onClick={() => toggleRole(role.value)}
              className={`${p.pill} ${selectedRoles.includes(role.value) ? p.pillOn : ""}`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Laddar användare" />
      ) : users?.length ? (
        <div className={s.list}>
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className={s.empty}>Inga användare hittades</p>
      )}

      <PaginationBase
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={() => {}}
      />
    </Container>
  )
}
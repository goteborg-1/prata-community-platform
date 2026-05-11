import { useAuth } from "../context/AuthContext"

export default function Success() {
  const { user, isLoggedIn } = useAuth()

  if (!isLoggedIn) return <h1>you are not signed in</h1>

  return (
    <div>
      <h1>success, you are signed in!</h1>
      <p>Handle: {user?.handle}</p>
      <p>Email: {user?.email}</p>
      <p>Display name: {user?.displayName}</p>
      <p>Role: {user?.role}</p>
    </div>
  )
}

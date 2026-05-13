import { Navigate, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/logga-in" replace />
  }

  return <Outlet />
}
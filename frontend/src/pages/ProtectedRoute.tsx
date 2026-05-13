import { Navigate, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Laddar..." />
  }

  if (!isLoggedIn) {
    return <Navigate to="/logga-in" replace />
  }

  return <Outlet />
}
import { Outlet } from "react-router"
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Unauthorized from "./ErrorPages/Unauthorized";

export default function AdminProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Laddar..." />
  }

  if (user?.role !== "admin") {
    return <Unauthorized />
  }

  return <Outlet />
}
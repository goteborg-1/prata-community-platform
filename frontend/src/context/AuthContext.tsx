import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./useAuth";
import { getToken, removeToken, setToken } from "../utils/auth";
import { api } from "../utils/api";
import type { User } from "@shared"

export interface AuthContextValue {
  user: User | null,
  isLoggedIn: boolean,
  isLoading: boolean,
  handleAuthSuccess: (token: string, userData: User) => void,
  logout: () => void
}

// export authProvider
export function AuthProvider({ children }: { children: React.ReactNode })  {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const token = getToken()
      if(!token) return null
      const res = await api.get("/profile")
      return res.data.data as User
    },
    retry: false,
    staleTime: Infinity
  })

  const isLoggedIn = !!user

  const handleAuthSuccess = (token: string, userData: User) => {
    setToken(token)
    queryClient.setQueryData(["auth-user"], userData)
    queryClient.invalidateQueries()
  }

  const logout = () => {
    removeToken()
    queryClient.removeQueries({ queryKey: ["auth-user"] })
    queryClient.clear()
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, isLoggedIn, handleAuthSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// export useAuth 


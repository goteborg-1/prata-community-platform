import { createContext, useContext} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, removeToken, setToken } from "../utils/auth";
import { api } from "../utils/api";
import type { User, LoginUserRequest, CreateUserRequest } from "@shared"



interface AuthContextValue {
  user: User | null,
  isLoggedIn: boolean,
  isLoading: boolean,
  handleAuthSuccess: (token: string, userData: User) => void,
  logout: () => void
}

// createcontext

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)


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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
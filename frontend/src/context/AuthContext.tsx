import { createContext, useContext, useState } from "react";
import type { User, LoginUserRequest, CreateUserRequest } from "@shared"
import { api } from "../utils/api";
import { removeToken, setToken } from "../utils/auth";



interface AuthContextValue {
  user: User | null,
  isLoggedIn: boolean,
  login: (credentials: LoginUserRequest) => Promise<void>,
  register: (credentials: CreateUserRequest) => Promise<void>,
  logout: () => void

}

// createcontext

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)


// export authProvider

export function AuthProvider({ children }: { children: React.ReactNode })  {
  const [user, setUser] = useState<User | null>(null)
  
  const isLoggedIn = !!user

  const login = async (credentials: LoginUserRequest) => {
    const response = await api.post("/users/login", credentials)

    const { token, user: userData } = response.data.data // renamed to userData to avoid conflict with user from setUser
    setToken(token) // added to localstorage
    setUser(userData)
  }

  const register = async (credentials: CreateUserRequest) => {
    const response = await api.post("/users/register", credentials)

    const { token, newUser } = response.data.data
    setToken(token) // added to localstorage
    setUser(newUser)
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
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
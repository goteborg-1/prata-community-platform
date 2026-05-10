import { createContext, useContext, useEffect, useState } from "react";
import type { User, LoginUserRequest, CreateUserRequest } from "@shared"
import { api } from "../utils/api";
import { getToken, removeToken, setToken } from "../utils/auth";



interface AuthContextValue {
  user: User | null,
  isLoggedIn: boolean,
  login: (credentials: LoginUserRequest) => Promise<void>,
  register: (credentials: CreateUserRequest) => Promise<void>,
  loginWithGoogle: (token: string, userData: User) => void,
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

  const loginWithGoogle = (token: string, userData: User) => {
    setToken(token)
    setUser(userData)
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  useEffect(() => {
    const token = getToken()
    if (!token) return

    // if token found, auto sign in user
    const restore = async () => {
      try {
        const userData = await api.get("/profile");
  
        setUser(userData.data.data)
        
      } catch {
        // if token fails or error, sign out/reset
        logout()
      }

    } 
    restore()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, loginWithGoogle, logout }}>
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
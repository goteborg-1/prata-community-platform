import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    const status = error.response?.status
    const isLoginRequest = error.config.url?.includes("/login")

    if(status === 401 && !isLoginRequest) {
      console.warn("Sessionen har gått ut, loggar ut...")
      localStorage.removeItem("token")
      window.location.href = "/logga-in"
    }

    if(status === 403) {
      console.error("Du saknar behörighet för denna resurs.")
    }

    return Promise.reject(error)
  }
)
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginUserSchema, type loginUserBody } from "@shared";
import { api } from "../../utils/api";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./LoginForm.module.css"

export default function LoginForm() {
  const [formData, setFormData] = useState<loginUserBody>({ email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))

    if(errors[name]) {
      setErrors(prev => ({...prev, [name]: undefined}))
    }
  }

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = loginUserSchema.safeParse(formData)

    if(!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await api.post("/users/login", result.data)

      const { token } = response.data
      localStorage.setItem("token", token)

      navigate("/")
    } catch (error: unknown) {
      if(axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message
        setErrors({
          password: [backendMessage || "Fel e-postadress eller lösenord."]
        })
      } else {
        setErrors({password: ["Ett oväntat fel uppstod"]})
      }
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <form action="submit" onSubmit={handleLogin} className={s.form} noValidate>
      <div className={s.inputWrapper}>
        <Input 
          name="email"
          type="email"
          placeholder="E-postadress"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={s.error}>{errors.email[0]}</p>}
      </div>

      <div className={s.inputWrapper}>
        <Input 
          name="password"
          type="password"
          placeholder="Lösenord"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className={s.error}>{errors.password[0]}</p>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loggar in..." : "Logga in"}
      </Button>
    </form>
  )
}
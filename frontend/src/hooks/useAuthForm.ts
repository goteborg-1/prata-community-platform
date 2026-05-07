import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { createUserBody, loginUserBody, ZodSchema } from "@shared";
import { api } from "../utils/api";
import { setToken } from "../utils/auth";

export function useAuthForm<T extends loginUserBody | createUserBody>(
  schema: ZodSchema<T>, 
  endpoint: string,
  initialValues: T
) {
  const [formData, setFormData] = useState<T>(initialValues)
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = schema.safeParse(formData)

    if(!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await api.post(endpoint, result.data)

      const { token } = response.data.data
      setToken(token)

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

  return { formData, errors, isLoading, handleChange, handleSubmit }
}
import { useState } from "react";
import { type ZodSchema } from "@shared";
import { api } from "../utils/api";
import axios from "axios";

/**
 * T = Type for form data (Request)
 * U = Type for API-response (Response)
 */
interface useFormOptions<T, U> {
  schema?: ZodSchema<T>,
  endpoint: string,
  initialValues: T,
  onSuccess?: (data: U) => void
}

export function useForm<T, U>({schema, endpoint, initialValues, onSuccess}: useFormOptions<T, U>) {
  const [ form, setForm ] = useState<T>(initialValues)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errors, setErrors ] = useState<Record<string, string[] | undefined>>({})

  const handleChange = (field: keyof T, value: unknown) => {
    setForm((prev) => ({...prev, [field]: value}))

    const fieldName = field as string
    if(errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }))
    }
  }

  const handleSubmit = async (e?: React.SubmitEvent) => {
    if(e) e.preventDefault()

    // If schema - validate
    if(schema) {
      const result = schema.safeParse(form)
      if(!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors
        setErrors(fieldErrors)
        return
      }
    }

    setIsLoading(true)
    setErrors({})

    try{
      const response = await api.post(endpoint, form)

      if(onSuccess) {
        onSuccess(response.data.data)
        console.log(response.data.data)
      }

      return response.data
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message || "Ett oväntat fel uppstod"
        setErrors((prev) => ({ ...prev, form: [backendMessage] }))
      }
      return {success: false}
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setForm(initialValues)
    setErrors({})
  }

  return{ form, setForm, errors, isLoading, handleChange, handleSubmit, reset}
}
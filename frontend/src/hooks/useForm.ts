import { useState } from "react";
import { type ZodSchema } from "@shared";
import { api } from "../utils/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface useFormOptions<T, U> {
  schema?: ZodSchema<T>,
  endpoint: string,
  initialValues: T,
  onSuccess?: (data: U) => void,
  method?: "POST" | "PATCH" | "PUT"
}

export function useForm<T, U>({
  schema,
  endpoint,
  initialValues,
  onSuccess,
  method = "POST",
}: useFormOptions<T, U>) {
  const [form, setForm] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})

  const mutation = useMutation({
    mutationFn: async (formData: T) => {
      const response = await api({
        method,
        url: endpoint,
        data: formData,
      })
      return response.data.data as U
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message || "Ett oväntat fel uppstod";
        setErrors((prev) => ({ ...prev, form: [backendMessage] }))
      }
    },
  })

  const handleChange = (field: keyof T, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    const fieldName = field as string
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }))
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (schema) {
      const result = schema.safeParse(form)
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors
        setErrors(fieldErrors)
        return
      }
    }

    setErrors({});
    mutation.mutate(form)
  }

  const reset = () => {
    setForm(initialValues)
    setErrors({})
    mutation.reset()
  }

  return { 
    form, 
    setForm, 
    errors, 
    isLoading: mutation.isPending,
    handleChange, 
    handleSubmit, 
    reset,
  }
}
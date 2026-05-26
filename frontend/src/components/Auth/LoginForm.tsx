import { useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth";
import { useForm } from "../../hooks/useForm";
import { type LoginUserRequest, loginUserSchema, type User } from "@prata/shared";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./Auth.module.css"

interface LoginResponse {
  token: string,
  user: User
}

export default function LoginForm() {
  const navigate = useNavigate()
  const { handleAuthSuccess } = useAuth()

  const { form, errors, isLoading, handleChange, handleSubmit } = useForm<LoginUserRequest, LoginResponse>({
    schema: loginUserSchema,
    endpoint: "/users/login",
    initialValues: {email: "", password: ""},
    onSuccess: (data) => {
      handleAuthSuccess(data.token, data.user)
      navigate("/")
    }
  })

  return(
    <form onSubmit={handleSubmit} className={s.form} noValidate>
      <div className={s.inputWrapper}>
        <Input 
          name="email"
          type="email"
          placeholder="E-postadress"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        {errors.email && <p className={s.error}>{errors.email[0]}</p>}
      </div>

      <div className={s.inputWrapper}>
        <Input 
          name="password"
          type="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        {errors.password && <p className={s.error}>{errors.password[0]}</p>}
        {errors.form && <p className={s.error}>{errors.form[0]}</p>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loggar in..." : "Logga in"}
      </Button>
    </form>
  )
}
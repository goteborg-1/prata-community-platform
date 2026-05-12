import { type CreateUserRequest, createUserSchema, type User } from "@shared";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./Auth.module.css"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";

interface SignupResponse {
  token: string,
  user: User
}

export default function SignupForm() {
  const navigate = useNavigate()
  const {handleAuthSuccess} = useAuth()

  const { handleSubmit, handleChange, form, errors, isLoading} = useForm<CreateUserRequest, SignupResponse>({
    schema: createUserSchema,
    endpoint: "/users/register",
    initialValues: {
      handle: "",
      email: "",
      password: ""
    },
    onSuccess: (data) => {
      handleAuthSuccess(data.token, data.user)
      navigate("/")
    }
  })

  return(
    <form action="submit" onSubmit={handleSubmit} className={s.form} noValidate>
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
          name="handle"
          type="text"
          placeholder="Användarnamn"
          value={form.handle}
          onChange={(e) => handleChange("handle", e.target.value)}
          required
        />
        {errors.handle && <p className={s.error}>{errors.handle[0]}</p>}
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
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Skapar konto..." : "Gå med nu"}
      </Button>
    </form>
  )
}
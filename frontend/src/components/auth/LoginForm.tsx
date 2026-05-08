import { loginUserSchema } from "@shared";
import { useAuthForm } from "../../hooks/useAuthForm";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./Auth.module.css"

export default function LoginForm() {
  const { handleSubmit, handleChange, formData, errors, isLoading} = useAuthForm(loginUserSchema, "/users/login", {email: "", password: ""})

  return(
    <form action="submit" onSubmit={handleSubmit} className={s.form} noValidate>
      <div className={s.inputWrapper}>
        <Input 
          name="email"
          type="email"
          placeholder="E-postadress"
          value={formData.email}
          onChange={handleChange}
          required
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
          required
        />
        {errors.password && <p className={s.error}>{errors.password[0]}</p>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loggar in..." : "Logga in"}
      </Button>
    </form>
  )
}
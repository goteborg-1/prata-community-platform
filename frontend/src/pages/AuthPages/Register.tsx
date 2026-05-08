import { Link } from "react-router"
import { useTheme } from "../../context/useTheme.tsx"
import Container from "../../components/Container/Container.tsx"
import GoogleLoginWindow from "../../components/Auth/GoogleLogin.tsx"
import SignupForm from "../../components/Auth/SignupForm.tsx"
import s from "./Auth.module.css"

export default function Signup() {
  const { resolvedTheme } = useTheme()

  return(
    <Container variant="small">
      <img
        src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
        className={s.logo} 
      />

      <div className={s.titleWrapper}>
        <h2 className={s.title}>Skapa konto</h2>
        <p className={s.subTitle}>Välkommen till PrataUt!</p>
      </div>

      <GoogleLoginWindow />

      <div className={s.divider}>
        <span>eller</span>
      </div>

      <SignupForm />

      <span className={s.linkSpan}>
        <p>Har du redan ett konto?</p>
        <Link to="/logga-in" className={s.link}>Logga in</Link>
      </span>
    </Container>
  )
}
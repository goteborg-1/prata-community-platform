import { Link } from "react-router";
import { useTheme } from "../../context/useTheme";
import Container from "../../components/Container/Container";
import GoogleLoginWindow from "../../components/auth/GoogleLogin";
import LoginForm from "../../components/auth/LoginForm";
import s from "./Auth.module.css"

export default function Login() {
  const { resolvedTheme } = useTheme()

  return(
    <Container variant="small">
      <img
        src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
        className={s.logo} 
      />

      <div className={s.titleWrapper}>
        <h2 className={s.title}>Logga in</h2>
        <p className={s.subTitle}>Välkommen tillbaka till PrataUt!</p>
      </div>

      <GoogleLoginWindow />

      <div className={s.divider}>
        <span>eller</span>
      </div>

      <LoginForm />

      <span className={s.linkSpan}>
        <p>Har du inget konto?</p>
        <Link to="/registrera" className={s.link}>Skapa konto</Link>
      </span>
    </Container>
  )
}
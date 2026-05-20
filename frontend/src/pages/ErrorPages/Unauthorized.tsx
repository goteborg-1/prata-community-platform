import { useNavigate } from "react-router"
import Container from "../../components/Container/Container"
import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button"
import s from "./Unauthorized.module.css"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <Container center variant="small">
      <Card>
        <div className={s.wrapper}>
          <h2 className={s.title}>Ingen åtkomst</h2>
          <p className={s.description}>
            Du har inte behörighet att visa den här sidan. Det kan bero på att du inte är inloggad, eller att ditt konto saknar nödvändiga administratörsrättigheter.
          </p>
          <Button 
            onClick={() => navigate("/")} 
          >
            Tillbaka till startsidan
          </Button>
        </div>
      </Card>
    </Container>
  )
}
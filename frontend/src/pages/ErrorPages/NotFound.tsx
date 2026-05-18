import { useNavigate } from "react-router"
import Container from "../../components/Container/Container"
import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button"
import s from "./Unauthorized.module.css"

export default function NotFound() {
  const navigate = useNavigate()
  return(
    <Container center variant="small">
      <Card>
        <div className={s.wrapper}>
          <h2 className={s.title}>Sidan hittades inte</h2>
          <p className={s.description}>
            Länken du följde kan vara bruten, eller så har sidan tagits bort. Dubbelkolla adressen eller gå tillbaka.
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
import { Link } from "react-router"
import Container from "../components/Container/Container"
import Card from "../components/Card/Card"
import b from "../components/Button/Button.module.css"
import s from "./About.module.css"


const subtitleWords: { text: string; color?: string }[] = [
  { text: "Dela" },
  { text: "dina" },
  { text: "tankar" },
  { text: "och" },
  { text: "få" },
  { text: "perspektiv" },
  { text: "från" },
  { text: "andra" },
  { text: "användare", color: s.wordAccent },
  { text: "och" },
  { text: "psykologer", color: s.wordPrimary },
  { text: "i" },
  { text: "samma" },
  { text: "flöde." },
]

function AnimatedSubtitle() {
  return (
    <p className={s.subtitle}>
      {subtitleWords.map((word, i) => (
        <span
          key={i}
          className={`${s.word} ${word.color ?? ""}`}
          style={{ animationDelay: `${i * 0.11}s` }}
        >
          {word.text}
        </span>
      ))}
    </p>
  )
}

export default function About() {
  return (
    <Container variant="narrow">
      <div className={s.hero}>
        <h1>Om Prata Ut</h1>
        <AnimatedSubtitle />
      </div>

      <div className={s.cards}>
        <Card>
          <h2>Vad är Prata Ut?</h2>
          <p>
            Prata Ut är ett community där du kan dela tankar, känslor och upplevelser med andra som förstår.
            Här möts vanliga användare och psykologer i samma flöde. Du kan få perspektiv från någon som är mitt i samma situation,
            någon som tagit sig igenom det, eller en expert som arbetat med just det du brottas med.
          </p>
        </Card>

        <Card>
          <h2>Varför vi finns</h2>
          <p>
            Alltför många bär på saker de aldrig pratar om. Skam, rädsla eller känslan av att ingen förstår.
            Vi ville skapa en plats där du kan prata utan att det behöver vara perfekt formulerat eller ens ha en lösning.
            Ibland räcker det att bli hörd av någon som sitter i samma sits, redan varit där eller som kanske hjälp andra i liknande situationer. Du är inte ensam
          </p>
        </Card>

        <Card>
          <h2>Våra värderingar</h2>
          <ul className={s.values}>
            <li>Du bestämmer vad du delar och hur personligt du håller det.</li>
            <li>Alla berättelser är välkomna, oavsett vad de handlar om.</li>
            <li>Experter och användare bidrar på lika villkor.</li>
            <li>Inga rätta eller felaktiga känslor. Allt får finnas här.</li>
          </ul>
        </Card>

        <div className={s.cta}>
          <p>Redo att börja dela? Du behöver inte ha alla ord klara.</p>
          <Link to="/flode" className={`${b.base} ${b.primary}`}>
            Gå till flödet
          </Link>
        </div>

        <Card>
          <p>
            Hör gärna av dig till <a href="mailto:hej@prataUT.se">hej@prataUT.se</a> om du har frågor eller funderingar.
          </p>
          <p>
            Är du <span className={s.psykolog}>psykolog</span> och vill vara en del av gemenskapen?
            Skicka ditt certifikat till samma adress så återkommer vi så snart vi kan.
          </p>
        </Card>
      </div>
    </Container>
  )
}

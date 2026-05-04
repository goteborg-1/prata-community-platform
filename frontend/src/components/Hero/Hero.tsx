import Illustration from "../../assets/support-community.png"
import darktest from "../../assets/ny bild darkmode.png"
import Button from "../Button/Button"
import s from "./Hero.module.css"

export default function Hero() {
  return(
    <section className={s.container}>
      <div className={s.inner}>
        
        <div className={s.visual}>
          <img 
            src={darktest} 
            alt="Två personer som sitter tillsammans och pratar mjukt, med ett symboliskt band av ljus mellan sig." 
            className={s.image}
          />
        </div>

        <div className={s.textBlock}>
          <h1 className={s.title}>
            Här börjar vägen till att må bättre - tillsammans.
          </h1>
          <p className={s.subtitle}>
            Du är inte ensam. Dela dina tankar, hitta stöd i gemenskapen och bygg modet att ta nästa steg mot professionell hjälp.
          </p>
          
          <div className={s.actions}>
            <Button onClick={() => console.log("Klick")}>
              Börja prata med andra
            </Button>
            
            <a href="/psykologer" className={s.link}>
              Läs mer om professionellt stöd
            </a>
          </div>
        </div>

        <div className={s.wave}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={s.fill}></path>
          </svg>
        </div>

      </div>
    </section>
  )
}
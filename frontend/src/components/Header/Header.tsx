import { IoMenu } from "react-icons/io5";
import Button from "../Button/Button"
import logo from "../../assets/logo.png"
import s from "./Header.module.css"

export default function Header() {
  return(
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <img src={logo} alt="logo" className={s.logo} />
        <p className={s.logoText}>Prata Ut</p>
      </div>

      <div className={s.buttonWrapper}>
        <Button
          size="small"
        >
          Skapa konto
        </Button>
        <Button
          variant="transparent"
          size="x-small"
        >
          <IoMenu size={24}/>
        </Button>
      </div>
    </header>
  )
}
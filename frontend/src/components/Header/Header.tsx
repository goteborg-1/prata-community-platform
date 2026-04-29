import { useEffect } from "react";
import { useTheme } from "../../context/useTheme";
import { IoClose, IoMenu } from "react-icons/io5";
import Button from "../Button/Button"
import s from "./Header.module.css"
import { useState } from "react";
import { mainMenu, secondaryMenu } from "./menuItems";
import { NavLink } from "react-router";

export default function Header() {
  const { resolvedTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return(
    <>
      <header className={s.header}>
        <div className={s.logoWrapper}>
          <img 
            src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
            className={s.logo} 
          />
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
            onClick={toggleMenu}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24}/>}
          </Button>
        </div>
      </header>

      {isMenuOpen &&
        <nav className={s.navContainer}>
          <ul className={s.navList}>
            <div className={s.navWrapper}>
              {mainMenu.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? s.active : "")}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </div>

            <div className={s.navWrapper}>
              {secondaryMenu.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? s.isActive : "")}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </div>
          </ul>
        </nav>
      }
    </>
  )
}
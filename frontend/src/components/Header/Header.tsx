import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { useTheme } from "../../context/useTheme";
import { useAuth } from "../../context/useAuth";
import { mainMenu, secondaryMenu } from "./menuItems";
import Button from "../Button/Button"
import AvatarMenu from "../Avatar/AvatarMenu";
import s from "./Header.module.css"
import b from "../Button/Button.module.css"

export default function Header() {
  const { user } = useAuth()
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
        <Link to="/" className={s.logoWrapper}>
          <img 
            src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
            className={s.logo} 
          />
          <p className={s.logoText}>Prata Ut</p>
        </Link>

        <div className={s.buttonWrapper}>
          {user ? (
            <AvatarMenu/>
          ) : (
            <>
              <div className={s.hide}>
                <Link to="/registrera" className={`${b.base} ${b.small} ${b.transparent}`}>
                  Skapa konto
                </Link>
              </div>

              <Link to="/logga-in" className={`${b.base} ${b.small} ${b.primary}`}>
                Logga in
              </Link>
            </>
          )}

          <Button
            variant="transparent"
            size="x-small"
            onClick={toggleMenu}
          >
            <div className={`${s.hamburger} ${isMenuOpen ? s.open : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
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
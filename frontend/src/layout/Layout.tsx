import { Outlet } from "react-router"
import Header from "../components/Header/Header"
import s from "./Layout.module.css"

export default function Layout() {
  return(
    <div className="body-container">
      <Header/>
      <main className={s.container}>
        <Outlet />
      </main>
    </div>
  )
}
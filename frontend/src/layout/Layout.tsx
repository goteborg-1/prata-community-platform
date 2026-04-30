import { Outlet } from "react-router"
import Header from "../components/Header/Header"

export default function Layout() {
  return(
    <div className="body-container">
      <Header/>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
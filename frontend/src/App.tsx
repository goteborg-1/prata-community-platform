import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/LoginPage/Login'
import Register from './pages/Register'
import SignUp from './pages/SignUp'
import Success from './pages/Success'
import './App.css'

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='flode' element={<Feed />} />
        <Route path='kategorier' element={<Categories />} />
        <Route path='profil' element={<Profile />} />
        <Route path='om-oss' element={<About />} />
        <Route path='logga-in' element={<Login />} />
        <Route path='registrera' element={<Register />} />

        {/* Temporary paths */}
        <Route path='signup' element={<SignUp />} />
        <Route path='success' element={<Success />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

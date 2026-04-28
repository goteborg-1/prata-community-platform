import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'
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

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

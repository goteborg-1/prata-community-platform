import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Profile from './pages/Profile/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/AuthPages/Login'
import Register from './pages/AuthPages/Register'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import './App.css'
import Admin from './pages/Admin/Admin'
import ProtectedRoute from './pages/ProtectedRoute'
import AdminProtectedRoute from './pages/AdminProtectedRoute'
import Settings from './pages/Profile/Settings'

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='flode' element={<Feed />} />
        <Route path='om-oss' element={<About />} />
        <Route path='logga-in' element={<Login />} />
        <Route path='registrera' element={<Register />} />
        <Route path='inlagg/:postId' element={<PostDetail />} />

        <Route element={<ProtectedRoute />}>
          <Route path='profil' element={<Profile />} />
          <Route path='inlagg/:postId/redigera' element={<EditPost />} />
          <Route path='installningar' element={<Settings />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path='admin' element={<Admin />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

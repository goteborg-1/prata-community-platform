import Container from "../components/Container/Container"
import CreatePost from "../components/Posts/CreatePost/CreatePost"
import { useAuth } from "../context/AuthContext"

export default function Feed() {
  const { isLoggedIn } = useAuth()

  return(
    <Container>
      { isLoggedIn && <CreatePost />}
    </Container>
  )
}
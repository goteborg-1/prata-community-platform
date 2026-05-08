import Container from "../components/Container/Container"
import CreatePost from "../components/Posts/CreatePost/CreatePost"

export default function Feed() {
  return(
    <Container>
      <CreatePost onSubmit={() => console.log("skickat")}/>
    </Container>
  )
}
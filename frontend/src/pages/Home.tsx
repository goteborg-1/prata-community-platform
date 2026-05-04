import Container from "../components/Container/Container";
import Hero from "../components/Hero/Hero";
import PostFeed from "../components/PostFeed/PostFeed";

export default function Home() {
  return(
    <>
      <Hero />
      <Container>
        <PostFeed />
      </Container>
    </>
  )
}
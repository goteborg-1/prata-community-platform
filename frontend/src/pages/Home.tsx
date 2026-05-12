import { usePosts } from "../hooks/usePosts";
import Container from "../components/Container/Container";
import Hero from "../components/Hero/Hero";
import PostCard from "../components/Posts/PostCard/PostCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function Home() {
  const { data: posts, isLoading, error } = usePosts()

  return(
    <>
      <Hero />
      <Container>
        <h2>Senaste inlägg</h2>
        {error && <p>Kunde inte ladda inlägg. Prova ladda om sidan.</p>}

        { isLoading ? (
          <LoadingSpinner text="Hämtar inlägg" />
        ) : (
          posts?.map((p) => (
            <div key={p.id}>
              <PostCard post={p} />
            </div>
          ))
        )}

        {!isLoading && posts?.length === 0 && <p>Inga inlägg hittades.</p>}
      </Container>
    </>
  )
}
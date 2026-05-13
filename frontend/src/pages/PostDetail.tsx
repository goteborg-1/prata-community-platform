import { useRef } from "react"
import { useParams } from "react-router"
import { usePost } from "../hooks/usePost"
import Container from "../components/Container/Container"
import NotFound from "./NotFound"
import Comments from "../components/Comments/Comments"
import DetailedPostCard from "../components/Posts/PostCard/DetailedPostCard"

export default function PostDetail() {
  const { postId } = useParams()
  const { post, isLoading, error } = usePost(postId)
  const commentsRef = useRef<HTMLDivElement>(null)

  if (!postId || !post) return <NotFound />

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if(isLoading) return <p>Laddar inlägg...</p>
  if(error) return <p>Inlägg kunde inte hittas</p>

  return (
    <Container>
      <DetailedPostCard post={post} scrollTo={scrollToComments} />
      <div ref={commentsRef}>
        <Comments postId={postId} postAuthorId={(post.userId as { id: string }).id} />
      </div>
    </Container>
  )
}

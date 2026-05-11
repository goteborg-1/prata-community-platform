import { useParams } from "react-router"
import { usePost } from "../hooks/usePost"
import Container from "../components/Container/Container"
import Comments from "../components/Comments/Comments"
import NotFound from "./NotFound"

export default function PostDetail() {
  const { postId } = useParams()
  const { post, isLoading, error } = usePost(postId)

  if (!postId) return <NotFound />
  if (isLoading) return <p>Laddar inlägg...</p>
  if (error) return <p>Inlägg kunde inte hittas</p>
  if (!post) return <NotFound />

  return (
    <div>
      <Container>
      <Comments postId={postId} postAuthorId={post.userId} />
      </Container>
    </div>
  )
}

import { useParams } from "react-router"
import { usePost } from "../hooks/usePost"
import Comments from "../components/Comments/Comments"
import NotFound from "./NotFound"

export default function PostDetail() {
  const { postId } = useParams()
  const { post, isLoading, error } = usePost(postId)

  if (!postId || !post) return <NotFound />

  if(isLoading) return <p>Laddar inlägg...</p>
  if(error) return <p>Inlägg kunde inte hittas</p>

  return (
    <div>
      <Comments postId={postId} />
    </div>
  )
}

import { useParams } from "react-router"
import Comments from "../components/Comments/Comments"

export default function PostDetail() {
  const { postId } = useParams()

  if (!postId) return <p>Inlägg hittades inte.</p>

  return (
    <div>
      <Comments postId={postId} />
    </div>
  )
}

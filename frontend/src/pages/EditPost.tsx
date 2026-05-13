import { useParams } from "react-router";
import EditPostForm from "../components/Posts/CreatePost/EditPostForm";
import { usePost } from "../hooks/usePost";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Container from "../components/Container/Container";

export default function EditPost() {
  const { postId } = useParams()
  const { post, isLoading } = usePost(postId)

  if (isLoading) return (
    <Container>
      <LoadingSpinner text="Laddar..." />
    </Container>
  )

  if(!post || !postId) return (
    <Container>
      <p>Inlägget hittades inte.</p>
    </Container>
  )

  return(
    <Container>
      <EditPostForm post={post} id={postId} />
    </Container>
  )
}
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useForm } from "../../hooks/useForm"
import { createCommentSchema, type Comment, type CreateCommentRequest } from "@shared"
import { api } from "../../utils/api"

interface Props {
  postId: string
}

const initialForm: CreateCommentRequest = {
  content: "",
  isAnonymous: false,
  isPsychologist: false
}

export default function Comments({ postId }: Props) {
  const { isLoggedIn } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    api.get(`/posts/${postId}/comments`)
      .then(res => setComments(res.data.data))
      .catch(() => setComments([]))
  }, [postId])

  const { form, handleChange, handleSubmit, isLoading, reset } = useForm<CreateCommentRequest, Comment>({
    endpoint: `/posts/${postId}/comments`,
    initialValues: initialForm,
    schema: createCommentSchema,
    onSuccess: (newComment) => {
      setComments(prev => [...prev, newComment])
      reset()
    }
  })

  return (
    <section>
      <h2>Kommentarer ({comments.length})</h2>

      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={form.content}
            onChange={e => handleChange("content", e.target.value)}
            placeholder="Skriv en kommentar..."
          />
          <label>
            <input
              type="checkbox"
              checked={form.isAnonymous}
              onChange={e => handleChange("isAnonymous", e.target.checked)}
            />
            Anonym
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Skickar..." : "Kommentera"}
          </button>
        </form>
      )}

      {comments.length === 0 ? (
        <p>Inga kommentarer än.</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.isAnonymous ? "Anonym" : (comment.username ?? comment.userId)}</p>
              <p>{comment.content}</p>
              <small>{comment.likeCount} gillar</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

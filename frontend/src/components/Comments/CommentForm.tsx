import { useEffect } from "react"
import { createCommentSchema, type Comment, type CreateCommentRequest } from "@prata/shared"
import { useForm } from "../../hooks/useForm"
import Textarea from "../Input/Textarea"
import Button from "../Button/Button"
import i from "../Input/Input.module.css"
import s from "./CommentForm.module.css"

interface Props {
  postId: string
  replyTarget: string
  onSuccess: (comment: Comment) => void
}

const initialForm: CreateCommentRequest = {
  content: "",
  isAnonymous: false,
  isPsychologist: false, // controlled by user role on the server, not user input
}

export default function CommentForm({ postId, replyTarget, onSuccess }: Props) {
  const { form, setForm, handleChange, handleSubmit, isLoading, reset } =
    useForm<CreateCommentRequest, Comment>({
      endpoint: `/posts/${postId}/comments`,
      initialValues: initialForm,
      schema: createCommentSchema,
      onSuccess: (newComment) => {
        onSuccess(newComment)
        reset()
      },
    })

  // Prefill textarea when "Svara" is clicked on a comment
  useEffect(() => {
    if (replyTarget) {
      setForm((prev) => ({ ...prev, content: replyTarget }))
    }
  }, [replyTarget, setForm])

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Textarea
        variant="form"
        placeholder="Skriv en kommentar..."
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
      />

      <div className={s.footer}>
        <label className={s.toggle}>
          <input
            type="checkbox"
            checked={form.isAnonymous}
            onChange={(e) => handleChange("isAnonymous", e.target.checked)}
          />
          <span className={s.track}>
            <span className={s.thumb} />
          </span>
          <span className={i.label}>Anonym</span>
        </label>

        <Button type="submit" size="small" disabled={isLoading}>
          {isLoading ? "Skickar..." : "Kommentera"}
        </Button>
      </div>
    </form>
  )
}

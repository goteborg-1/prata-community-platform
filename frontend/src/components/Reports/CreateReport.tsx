import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router"
import { useForm } from "../../hooks/useForm"
import { usePost } from "../../hooks/usePost"
import { useComment } from "../../hooks/useComment"
import { createReportSchema, REPORT_LABELS, REPORT_OPTIONS, type CreateReportRequest } from "@prata/shared"
import { IoClose } from "react-icons/io5"
import Button from "../Button/Button"
import Textarea from "../Input/Textarea"
import s from "../Posts/CreatePost/CreatePost.module.css"
import i from "../Input/Input.module.css"
import c from "../Card/Card.module.css"
import o from "./CreateReport.module.css"
import Container from "../Container/Container"
import Card from "../Card/Card"

export default function CreateReport() {
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const navigate = useNavigate()
  const { postId, commentId } = useParams<{ postId: string; commentId?: string }>()

  const { form, isLoading, errors, handleChange, handleSubmit, reset } = useForm<CreateReportRequest, Report>({
    endpoint: "/reports",
    initialValues: {
      postId: postId || "",
      commentId: commentId || undefined,
      reason: "",
      comment: ""
    },
    schema: createReportSchema,
    onSuccess: () => {
      reset()
      setIsSubmitted(true)
    }
  })

  const close = () => {
    reset()
    navigate(-1)
  }

  const { post } = usePost(postId)
  const { comment } = useComment(postId, commentId)

  const content = commentId ? comment : post
  const author = content?.userId && typeof content.userId === "object" && "displayName" in content.userId
    ? content.userId.displayName
    : "Anonym Medlem"

  const rawDescription = commentId 
    ? comment?.content
    : post?.title
  const description = rawDescription && rawDescription.length > 80
    ? rawDescription.substring(0, rawDescription.lastIndexOf(" ", 80)) + "..."
    : rawDescription

  if (isSubmitted) {
    return (
      <Container>
        <Card center>
          <h2 className={s.title}>Tack för din rapport!</h2>
          <p style={{ margin: "1rem 0", color: "#666" }}>
            Moderatorer har tagit emot din anmälan och kommer att granska {commentId ? "kommentaren" : "inlägget"} inom kort.
          </p>
          <Button size="small" onClick={() => navigate(-1)}>
            Stäng
          </Button>
        </Card>
      </Container>
    )
  }

  return(
    <article className={`${s.container} ${c.card}`}>
      <header className={s.header}>
        <h2 className={s.title}>Skicka en rapport</h2>
        <Button 
          onClick={close}
          variant="transparent"
          size="x-small"
        >
          <IoClose size={20}/>
        </Button>
      </header>

      <div className={o.overview}>
        <p className={o.author}>{commentId ? "Kommentar" : "Inlägg"} av {author}</p>
        <p className={o.content}>"{description}"</p>
        <Link to={`/inlagg/${postId}`}>&rarr; Gå till inlägget</Link>
      </div>

      <form className={`${s.form} ${o.form}`} onSubmit={handleSubmit}>

        <div className={s.field}>
          <p className={i.label}>Anledning</p>
          <div className={s.pills}>
            {REPORT_OPTIONS.map((option) => (
              <div key={option} className={o.innerWrapper}>
                <button 
                  type="button"
                  className={`${s.pill} ${form.reason === option ? s.pillOn : ""}`}
                  onClick={() => handleChange("reason", option)}
                >
                  {REPORT_LABELS[option]}
                </button>
              </div>
            ))}
          </div>
          {errors.reason && <p className={s.error}>{errors.reason}</p>}
        </div>

        <div className={s.field}>
          <Textarea
            id="comment"
            label="Kommentar (valfritt)"
            variant="form"
            placeholder="Beskriv kortfattat vad som är fel..."
            value={form.comment}
            onChange={(e) => handleChange("comment", e.target.value)}
          />
          <span className={s.row}>
              {errors.comment && <p className={s.error}>{errors.comment}</p>}

              <p className={`${s.charCount} ${(form.comment?.length ?? 0) > 500 ? s.charLimit : ""}`}>
                {form.comment?.length}/500
              </p>
            </span>
        </div>

        <footer className={s.footer}>
          <p className={s.hint}>Din rapport är anonym.</p>
          <div className={s.actions}>
            <Button
              type="button"
              size="small"
              variant="secondary" 
              disabled={isLoading}
              onClick={close}
            >
              Avbryt
            </Button>

            <Button 
              type="submit"
              size="small"
              disabled={isLoading} 
            >
              {isLoading ? "Skickar..." : "Skicka rapport"}
            </Button>
          </div>
        </footer>
      </form>
    </article>
  )
}
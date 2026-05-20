import { useNavigate } from "react-router"
import { IoClose } from "react-icons/io5"
import { CATEGORY_OPTIONS, CATEGORY_LABELS, TRIGGER_OPTIONS, TRIGGER_LABELS, type Post, type UpdatePostRequest, updatePostSchemaFrontEnd } from "@shared"
import { useForm } from "../../../hooks/useForm"
import Button from "../../Button/Button"
import Input from "../../Input/Input"
import Textarea from "../../Input/Textarea"
import i from "../../Input/Input.module.css"
import c from "../../Card/Card.module.css"
import s from "../CreatePost/CreatePost.module.css"

export default function EditPostForm({ post, id }: { post: Post, id: string }) {
  const navigate = useNavigate()

  const { form, isLoading, errors, handleChange, handleSubmit } = useForm<UpdatePostRequest, Post>({
    endpoint: `/posts/${id}`,
    method: "PATCH",
    schema: updatePostSchemaFrontEnd,
    initialValues: {
      title: post.title,
      description: post.description,
      categories: post.categories,
      triggerTags: post.triggerTags,
    },
    onSuccess: () => navigate(`/inlagg/${id}`)
  })

  const toggle = (key: "categories" | "triggerTags", value: string) => {
    const current = form[key] as string[]
    handleChange(key, current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    )
  }

  return (
    <article className={`${s.container} ${c.card}`}>
      <header className={s.header}>
        <h2 className={s.title}>Redigera inlägg</h2>
        <Button onClick={() => navigate(`/inlagg/${id}`)} variant="transparent" size="x-small">
          <IoClose size={20} />
        </Button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={s.form}>
          <div className={s.field}>
            <Input
              id="title"
              label="Titel"
              variant="form"
              placeholder="Vad handlar ditt inlägg om?"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <span className={s.row}>
              {errors.title && <p className={s.error}>{errors.title}</p>}
              <p className={`${s.charCount} ${form.title.length > 100 ? s.charLimit : ""}`}>
                {form.title.length}/100
              </p>
            </span>
          </div>

          <div className={s.field}>
            <Textarea
              id="desc"
              label="Beskrivning"
              variant="form"
              placeholder="Berätta mer..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <span className={s.row}>
              {errors.description && <p className={s.error}>{errors.description}</p>}
              <p className={`${s.charCount} ${form.description.length > 1000 ? s.charLimit : ""}`}>
                {form.description.length}/1000
              </p>
            </span>
          </div>

          <div className={s.field}>
            <p className={i.label}>Kategorier</p>
            <div className={s.pills}>
              {CATEGORY_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${s.pill} ${form.categories.includes(c) ? s.pillOn : ""}`}
                  onClick={() => toggle("categories", c)}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
            {errors.categories && <p className={s.error}>{errors.categories}</p>}
          </div>

          <div className={s.field}>
            <p className={i.label}>Triggervarningar</p>
            <div className={s.pills}>
              {TRIGGER_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`${s.pill} ${s.pillWarn} ${form.triggerTags.includes(t) ? s.pillWarnOn : ""}`}
                  onClick={() => toggle("triggerTags", t)}
                >
                  {TRIGGER_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className={s.footer}>
          {errors.form && <p className={s.error}>{errors.form}</p>}
          <div className={s.actions} style={{ marginLeft: "auto" }}>
            <Button
              type="button"
              size="small"
              variant="secondary"
              disabled={isLoading}
              onClick={() => navigate(`/inlagg/${id}`)}
            >
              Avbryt
            </Button>
            <Button type="submit" size="small" disabled={isLoading}>
              {isLoading ? "Sparar..." : "Spara ändringar"}
            </Button>
          </div>
        </footer>
      </form>
    </article>
  )
}
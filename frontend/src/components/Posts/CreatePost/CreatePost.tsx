import { useState } from "react";
import { useNavigate } from "react-router";
import { IoClose, IoEyeOffOutline } from "react-icons/io5";
import { CATEGORY_OPTIONS, CATEGORY_LABELS, createPostSchema, TRIGGER_OPTIONS, TRIGGER_LABELS, type CreatePostRequest, type Post } from "@prata/shared";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../context/useAuth";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Textarea from "../../Input/Textarea";
import Avatar from "../../Avatar/Avatar";
import i from "../../Input/Input.module.css"
import c from "../../Card/Card.module.css"
import s from "./CreatePost.module.css"

const initialForm: CreatePostRequest = { isAnonymous: false, title: "", description: "", categories: [], triggerTags: [] }


export default function CreatePost() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { form, isLoading, errors, handleChange, handleSubmit, reset } = useForm<CreatePostRequest, Post>({
    endpoint: "/posts",
    initialValues: initialForm,
    schema: createPostSchema,
    onSuccess: (newPost) => {
      close()
      const postId = newPost.id
      navigate(`/inlagg/${postId}`)
    }
  })

  if(!user) return null

  const toggle = (key: "categories" | "triggerTags", value: string) => {
    const currentArray = form[key] as string[]
    const nextValue = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    
    handleChange(key, nextValue)
  }

  const close = () => {
    setOpen(false)
    reset()
  }

  if(!open) return(
    <button className={s.trigger} onClick={() => setOpen(true)}>
      <span>
        <Avatar displayName={user.displayName!} color={user.avatarColor!} size="small"/>
      </span>
      <span className={s.triggerText}>Vad har du på hjärtat idag?</span>
    </button>
  )

  return(
    <article className={`${s.container} ${c.card}`}>
      <header className={s.header}>
        <h2 className={s.title}>Nytt inlägg</h2>
        <Button 
          onClick={close}
          variant="transparent"
          size="x-small"
        >
          <IoClose size={20}/>
        </Button>
      </header>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={`${i.input} ${i.form} ${s.row}`}>
          <span className={s.anonymousLabel}>
            <IoEyeOffOutline size={18} />
            <p>Posta anonymt</p>
          </span>

          <label className={s.toggle}>
            <input 
              type="checkbox"
              checked={form.isAnonymous}
              onChange={(e) => handleChange("isAnonymous", e.target.checked)}
            />
            <span className={s.track}>
              <span className={s.thumb} />
            </span>
          </label>
        </div>

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

        <footer className={s.footer}>
          <p className={s.hint}>{form.isAnonymous ? "Postas anonymt" : "Postas med ditt namn"}</p>
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
              {isLoading ? "Sparar..." : "Publicera"}
            </Button>
          </div>
        </footer>
      </form>
    </article>
  )
}
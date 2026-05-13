import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router"
import { deletePost } from "../../../api/posts.api"
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa"
import { useToggleLike } from "../../../hooks/useToggleLike"
import { formatTime } from "../../../utils/formatTime"
import { CATEGORY_LABELS, TRIGGER_LABELS, type Post } from "@shared"
import Card from "../../Card/Card"
import Button from "../../Button/Button"
import s from "./DetailedPostCard.module.css"
import p from "./PostCard.module.css"

interface Props {
  post: Post,
  scrollTo: () => void,
}

export default function DetailedPostCard({post, scrollTo}: Props) {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const { mutate: toggleLike, isPending } = useToggleLike()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if(!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return() => document.removeEventListener("mousedown", handler)
  })

  const handleDelete = () => {
    if(window.confirm("Är du säker på att du vill ta bort inlägget?")) {
      deletePost(post.id)
    }
  }

  const author = (typeof post.userId === 'object' && post.userId !== null)
    ? post.userId.displayName
    : "Anonym Medlem"

  const wasEdited = new Date(post.createdAt).getTime() !== new Date(post.updatedAt).getTime()

  return(
    <Card>
      <header className={s.header}>
        <div className={s.headerTop}>
          <div>
            <p className={p.author}>{author}</p>
            <p className={p.date}>
              {formatTime(post.createdAt)}
              {wasEdited && ` · uppdaterad ${formatTime(post.updatedAt)}`}
            </p>
          </div>

          {post.isOwner && (
            <div className={s.menuWrap} ref={menuRef}>
              <Button variant="transparent" size="x-small" onClick={() => setMenuOpen(v => !v)} aria-label="Fler alternativ">
                <span className={s.dots}>···</span>
              </Button>
              {menuOpen && (
                <div className={s.dropdown}>
                  <button className={s.menuItem} onClick={() => navigate(`/inlagg/${post.id}/redigera`)}>
                    Redigera
                  </button>
                  <div className={s.menuSep} />
                  <button className={`${s.menuItem} ${s.menuDanger}`} onClick={handleDelete}>
                    Ta bort
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <h2 className={s.title}>{post.title}</h2>
      </header>

      <div className={s.body}>
        <p>{post.description}</p>

        <div className={s.tagsRow}>
          {post.triggerTags.map((t) => (
            <p key={t} className={`${p.pill} ${p.pillWarn}`}>{TRIGGER_LABELS[t]}</p>
          ))}

          {post.triggerTags.length > 0 && post.categories.length > 0 && (
            <span className={s.divider} />
          )}

          {post.categories.map((c) => (
            <p key={c} className={p.pill}>{CATEGORY_LABELS[c]}</p>
          ))}
        </div>
      </div>

      <footer className={s.footer}>
        <Button variant="transparent" size="x-small" onClick={() => toggleLike(post.id)} disabled={isPending}>
          <span className={`${p.action} ${post.isLiked ? p.isLiked : ""}`}>
            {post.isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{post.likeCount}</span>
          </span>
        </Button>
        <Button variant="transparent" size="x-small" onClick={scrollTo}>
            <span className={p.action}>
              <FaRegComment />
              <span>{post.commentCount}</span>
            </span>
        </Button>
      </footer>
    </Card>
  )
}
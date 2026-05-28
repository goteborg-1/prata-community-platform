import { useState, useRef, useEffect } from "react"
import { Link } from "react-router"
import type { Comment } from "@prata/shared"
import Textarea from "../Input/Textarea"
import Button from "../Button/Button"
import s from "./CommentCard.module.css"
import AuthorHeader from "../AuthorHeader/AuthorHeader"
import { getAuthor } from "../../utils/author"
import { useAuth } from "../../context/useAuth"

interface Props {
  comment: Comment
  currentUserId: string | null
  currentUserDisplayName: string | null
  postAuthorId: string | null
  isLiked: boolean
  onReply: (username: string) => void
  onEdit: (id: string, content: string) => void
  onDelete: (id: string) => void
  onLike: (id: string) => void
}

export default function CommentCard({
  comment,
  currentUserDisplayName,
  isLiked,
  onReply,
  onEdit,
  onDelete,
  onLike,
}: Props) {
  const { user, isLoggedIn } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      const handler = (e: MouseEvent) => {
        if(!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
      }
      document.addEventListener("mousedown", handler)
      return() => document.removeEventListener("mousedown", handler)
  })

  const isMentioned =
    !!currentUserDisplayName &&
    comment.content.includes(`@${currentUserDisplayName}`)
  const author = getAuthor({data: comment})

  const borderClass = comment.isOP
    ? s.borderAuthor
    : comment.isAnonymous
    ? s.borderNormal
    : comment.isPsychologist
    ? s.borderPsychologist
    : s.borderNormal

  const handleStartEdit = () => {
    setEditContent(comment.content)
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    onEdit(comment.id, editContent)
    setIsEditing(false)
  }

  return (
    <div className={`${s.card} ${borderClass} ${isMentioned ? s.mentioned : ""}`}>
      <header className={s.header}>
        <AuthorHeader 
          data={comment}
          badge={comment.isOP
            ? "op"
            : comment.isPsychologist && !comment.isAnonymous
            ? "psychologist"
            : undefined
          }
        />

        {isLoggedIn &&
            <div className={s.menuWrap} ref={menuRef}>
              <Button variant="transparent" size="x-small" onClick={() => setMenuOpen(v => !v)} aria-label="Fler alternativ">
                <span className={s.dots}>···</span>
              </Button>
              {menuOpen && !isEditing && (
                <div className={s.dropdown}>
                  {!comment.isOwner &&
                    <Link to={`${comment.id}/rapportera`} className={s.menuItem}>
                      Rapportera
                    </Link>
                  }

                  {comment.isOwner && 
                    <button className={s.menuItem} onClick={handleStartEdit}>
                      Redigera
                    </button>
                  }

                  {(comment.isOwner || user?.role === "admin") &&
                    <button className={`${s.menuItem} ${s.menuDanger}`} onClick={() => onDelete(comment.id)}>
                      Ta bort
                    </button>
                  }
                </div>
              )}
            </div>
          }
      </header>

      {isEditing ? (
        <div className={s.editWrapper}>
          <Textarea
            variant="form"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className={s.editActions}>
            <Button size="small" onClick={handleSaveEdit}>
              Spara
            </Button>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Avbryt
            </Button>
          </div>
        </div>
      ) : (
        <p className={s.content}>{comment.content}</p>
      )}

      {comment.isEdited && !isEditing && (
        <span className={s.edited}>(redigerad)</span>
      )}

      <div className={s.footer}>
        <button
          className={`${s.likeBtn} ${isLiked ? s.liked : ""}`}
          onClick={() => onLike(comment.id)}
          aria-label="Gilla kommentar"
          type="button"
        >
          <HeartIcon filled={isLiked} />
          <span>{comment.likeCount}</span>
        </button>

        <div className={s.actions}>
          <button
            className={s.actionBtn}
            type="button"
            onClick={() => onReply(comment.isAnonymous ? "Anonym Medlem" : author)}
          >
            Svara
          </button>
        </div>
      </div>
    </div>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-secondary)" : "none"}
      stroke={filled ? "var(--color-secondary)" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.82 3.9 12 5C12.18 3.9 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  )
}

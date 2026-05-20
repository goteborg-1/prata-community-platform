import { useState } from "react"
import type { Comment } from "@shared"
import Textarea from "../Input/Textarea"
import Button from "../Button/Button"
import s from "./CommentCard.module.css"

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
  currentUserId,
  currentUserDisplayName,
  postAuthorId,
  isLiked,
  onReply,
  onEdit,
  onDelete,
  onLike,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const isOwner = !!currentUserId && comment.userId === currentUserId
  const isAuthor = !!postAuthorId && comment.userId === postAuthorId
  const isMentioned =
    !!currentUserDisplayName &&
    comment.content.includes(`@${currentUserDisplayName}`)

  const borderClass = comment.isPsychologist
    ? s.borderPsychologist
    : isAuthor
    ? s.borderAuthor
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
      <div className={s.header}>
        <div className={s.nameRow}>
          <span className={s.name}>
            {comment.isAnonymous ? "Anonym" : (comment.username ?? "Okänd")}
          </span>
          {comment.isPsychologist && !comment.isAnonymous && (
            <span className={`${s.badge} ${s.badgePsyk}`}>
              <LightbulbIcon />
              Psykolog
            </span>
          )}
          {isAuthor && !comment.isPsychologist && !comment.isAnonymous && (
            <span className={`${s.badge} ${s.badgeAuthor}`}>
              <PersonIcon />
              OP
            </span>
          )}
        </div>
        <span className={s.time}>{formatTime(comment.createdAt)}</span>
      </div>

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
          {!comment.isAnonymous && comment.username && (
            <button
              className={s.actionBtn}
              type="button"
              onClick={() => onReply(comment.username ?? "")}
            >
              Svara
            </button>
          )}
          {isOwner && !isEditing && (
            <>
              <button
                className={s.actionBtn}
                type="button"
                onClick={handleStartEdit}
              >
                Redigera
              </button>
              <button
                className={`${s.actionBtn} ${s.deleteBtn}`}
                type="button"
                onClick={() => onDelete(comment.id)}
              >
                Ta bort
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "just nu"
  if (diffMins < 60) return `${diffMins} min sedan`
  if (diffHours < 24) return `${diffHours} tim sedan`
  if (diffDays < 7) return `${diffDays} dag${diffDays > 1 ? "ar" : ""} sedan`
  return date.toLocaleDateString("sv-SE")
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

function LightbulbIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.21 4.16-3 5.2V17a1 1 0 01-1 1H10a1 1 0 01-1-1v-2.8C7.21 13.16 6 11.22 6 9a6 6 0 016-6z" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

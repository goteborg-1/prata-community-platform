import { useState, useEffect } from "react"
import { useAuth } from "../../context/useAuth"
import { api } from "../../utils/api"
import type { Comment } from "@prata/shared"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"
import s from "./Comments.module.css"

interface Props {
  postId: string
  postAuthorId: string | null
}

export default function Comments({ postId, postAuthorId }: Props) {
  const { user, isLoggedIn } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [replyTarget, setReplyTarget] = useState("")
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/posts/${postId}/comments`)
      .then((res) => {
        const data = res.data.data
        setComments(data)
        setLikedIds(new Set(
          data.filter((c: Comment) => c.isLikedByCurrentUser).map((c: Comment) => c.id)
        ))
      })
      .catch(() => setComments([]))
      .finally(() => setIsLoading(false))
  }, [postId])

  const handleSuccess = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment])
    setLikedIds((prev) => new Set(prev).add(newComment.id))
    setReplyTarget("")
  }

  const handleReply = (username: string) => {
    setReplyTarget(`@${username} `)
  }

  const handleLike = async (id: string) => {
    const alreadyLiked = likedIds.has(id)

    // optimistic update
    setLikedIds((prev) => {
      const next = new Set(prev)
      alreadyLiked ? next.delete(id) : next.add(id)
      return next
    })
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likeCount: alreadyLiked ? c.likeCount - 1 : c.likeCount + 1 }
          : c
      )
    )

    try {
      await api.patch(`/posts/${postId}/comments/${id}/like`)
    } catch {
      // revert on error
      setLikedIds((prev) => {
        const next = new Set(prev)
        alreadyLiked ? next.add(id) : next.delete(id)
        return next
      })
      setComments((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, likeCount: alreadyLiked ? c.likeCount + 1 : c.likeCount - 1 }
            : c
        )
      )
    }
  }

  const handleEdit = async (id: string, content: string) => {
    try {
      await api.patch(`/posts/${postId}/comments/${id}`, { content })
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, content, isEdited: true } : c))
      )
    } catch {
      // comment stays unchanged
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${postId}/comments/${id}`)
      setComments((prev) => prev.filter((c) => c.id !== id))
    } catch {
      // comment stays unchanged
    }
  }

  return (
    <section className={s.section}>
      <h2 className={s.heading}>Kommentarer ({comments.length})</h2>

      <div className={s.list}>
        {isLoading ? null : comments.length === 0 ? (
          <p className={s.empty}>Inga kommentarer än. Var den första!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={user?.id ?? null}
              currentUserDisplayName={user?.displayName ?? null}
              postAuthorId={postAuthorId}
              isLiked={likedIds.has(comment.id)}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onLike={handleLike}
            />
          ))
        )}
      </div>

      {isLoggedIn ? (
        <CommentForm
          postId={postId}
          replyTarget={replyTarget}
          onSuccess={handleSuccess}
        />
      ) : (
        <p className={s.loginHint}>Logga in för att kommentera</p>
      )}
    </section>
  )
}

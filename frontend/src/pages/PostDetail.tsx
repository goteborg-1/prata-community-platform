import { useRef } from "react"
import { useParams } from "react-router"
import { usePost } from "../hooks/usePost"
import { useToggleLike } from "../hooks/useToggleLike"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import { formatDate } from "../utils/formatDate"
import { CATEGORY_LABELS, TRIGGER_LABELS } from "@shared"
import Container from "../components/Container/Container"
import NotFound from "./NotFound"
import Card from "../components/Card/Card"
import Button from "../components/Button/Button"
import Comments from "../components/Comments/Comments"
import p from "../components/Posts/PostCard/PostCard.module.css"
import s from "./PostDetails.module.css"

export default function PostDetail() {
  const { postId } = useParams()
  const { post, isLoading, error } = usePost(postId)
  const { mutate: toggleLike, isPending } = useToggleLike()
  const commentsRef = useRef<HTMLDivElement>(null)

  if (!postId || !post) return <NotFound />

  const author = (typeof post.userId === 'object' && post.userId !== null)
    ? post.userId.displayName
    : "Anonym Medlem"

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if(isLoading) return <p>Laddar inlägg...</p>
  if(error) return <p>Inlägg kunde inte hittas</p>

  return (
    <Container>
      <Card>
        <header className={s.header}>
          <div>
            <p className={p.author}>{author}</p>
            <p className={p.date}>{formatDate(post.createdAt)} · uppdaterad {formatDate(post.updatedAt)}</p>
          </div>
          <h2 className={s.title}>{post.title}</h2>
        </header>

        <div className={s.body}>
          <p>{post.description}</p>

          <div className={s.container}>
            <p className={p.author}>Kategorier</p>
            <div className={s.pillWrapper}>
              {post.categories.map((c) => (
                <p key={c} className={p.pill}>{CATEGORY_LABELS[c]}</p>
              ))}
            </div>
          </div>

          { post.triggerTags.length > 0 &&
            <div className={s.container}>
              <p className={p.author}>Triggervarningar</p>
              <div className={s.pillWrapper}>
                {post.triggerTags.map((t) => (
                  <p key={t} className={`${p.pill} ${p.pillWarn}`}>{TRIGGER_LABELS[t]}</p>
                ))}
              </div>
            </div>
          }
        </div>

        <footer className={s.footer}>
          <Button variant="transparent" size="x-small" onClick={() => toggleLike(post.id)} disabled={isPending}>
            <span className={`${p.action} ${post.isLiked ? p.isLiked : ""}`}>
              {post.isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{post.likeCount}</span>
            </span>
          </Button>
          <Button variant="transparent" size="x-small" onClick={scrollToComments}>
              <span className={p.action}>
                <FaRegComment />
                <span>{post.commentCount}</span>
              </span>
          </Button>
        </footer>
      </Card>

      <div ref={commentsRef}>
        <Comments postId={postId} postAuthorId={(post.userId as { id: string }).id} />
      </div>
    </Container>
  )
}

import { useNavigate } from "react-router";
import { IoWarningOutline } from "react-icons/io5";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CATEGORY_LABELS, TRIGGER_LABELS, type Post } from "@shared";
import { formatDate } from "../../../utils/formatDate";
import Card from "../../Card/Card";
import s from "./PostCard.module.css"

export default function PostCard({post}: {post: Post}) {
  const navigate = useNavigate()

  console.log(post.isLiked)

  const author = (typeof post.userId === 'object' && post.userId !== null)
    ? post.userId.displayName
    : "Anonym Medlem"

  return(
    <Card isClickable={true} onClick={() => navigate(`/inlagg/${post.id}`)}>
      <header className={s.header}>
        <p className={s.author}>{author}</p>
        <p className={s.date}>{formatDate(post.createdAt)}</p>
      </header>

      <h3 className={s.title}>{post.title}</h3>

      {post.triggerTags.length > 0 ? (
          <div className={s.warning}>
            <span className={s.warningText}>
              <IoWarningOutline />
              <p>Känsligt innehåll - klicka för att läsa</p>
            </span>
          </div>
        ):(
          <p>
            {post.description.length > 200
              ? `${post.description.substring(0, 150)}...`
              : post.description
            }
          </p>
        )
      }

      <footer className={s.footer}>
        <div className={s.actionWrapper}>
          <span className={`${s.action} ${post.isLiked ? s.isLiked : ""}`}>
            {post.isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{post.likeCount}</span>
          </span>
          <span className={s.action}>
            <FaRegComment />
            <span>{post.commentCount}</span>
          </span>
        </div>

        <div className={s.pillWrapper}>
          {post.triggerTags.map((t) => (
            <p key={t} className={`${s.pill} ${s.pillWarn}`}>{TRIGGER_LABELS[t]}</p>
          ))}

          {post.categories.map((c) => (
            <p key={c} className={s.pill}>{CATEGORY_LABELS[c]}</p>
          ))}
        </div>
      </footer>
    </Card>
  )
}
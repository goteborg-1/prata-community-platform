import { useNavigate } from "react-router";
import { IoWarningOutline } from "react-icons/io5";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CATEGORY_LABELS, TRIGGER_LABELS, type Post } from "@prata/shared";
import { formatTime } from "../../../utils/formatTime";
import Card from "../../Card/Card";
import s from "./PostCard.module.css"
import Avatar from "../../Avatar/Avatar";

export default function PostCard({post}: {post: Post}) {
  const navigate = useNavigate()

  const userData = post.userId && typeof post.userId === "object" ? post.userId : null;
  const author = userData?.displayName || "Anonym Medlem"
  const avatarColor = userData?.avatarColor || "#84A59D"

  return(
    <Card isClickable={true} onClick={() => navigate(`/inlagg/${post.id}`)}>
      <header className={s.header}>
        <Avatar displayName={author} color={avatarColor} size="small"/>
        <span>
          <p className={s.author}>{author}</p>
          <p className={s.date}>{formatTime(post.createdAt)}</p>
        </span>
      </header>

      <h3 className={s.title}>{post.title}</h3>

      {post.triggerTags.length > 0 ? (
          <span className={s.warning}>
            <IoWarningOutline />
            <p>Känsligt innehåll - klicka för att läsa</p>
          </span>
        ):(
          <p>
            {post.description.length > 150
              ? post.description.substring(0, post.description.lastIndexOf(" ", 150)) + "..."
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

        <div className={`${s.pillWrapper} ${s.hide}`}>
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
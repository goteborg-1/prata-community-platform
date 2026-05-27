import type { Comment, Post } from "@prata/shared";
import { formatTime } from "../../utils/formatTime";
import Avatar from "../Avatar/Avatar";
import s from "./AuthorHeader.module.css"
import { getAuthor, getAvatarColor } from "../../utils/author";

interface Props {
  data: Post | Comment,
  badge?: "psychologist" | "op" | null
}

export default function AuthorHeader({data, badge=null}: Props) {
  const author = getAuthor({data})
  const avatarColor = getAvatarColor({data})

  console.log(data)
  return(
    <div className={s.authorWrapper}>
      <Avatar displayName={author} color={avatarColor} size="small" />
      <span>
        <span className={s.row}>
          <p className={s.author}>{author}</p>
          {badge === "psychologist" && (
            <span className={`${s.badge} ${s.badgePsyk}`}>
              <LightbulbIcon />
              Psykolog
            </span>
          )}

          {badge === "op" && (
            <span className={`${s.badge} ${s.badgeAuthor}`}>
              <PersonIcon />
              OP
            </span>
          )}
        </span>
        <p className={s.date}>
          {formatTime(data.createdAt)}
        </p>
      </span>
    </div>
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
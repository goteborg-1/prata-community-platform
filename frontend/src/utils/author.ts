import type { Comment, Post } from "@prata/shared";

interface Props {
  data: Post | Comment
}

export const getAuthor = ({data}: Props) => {
  const userData = data.userId && typeof data.userId === "object" ? data.userId : null;
  const author = userData?.displayName || "Anonym Medlem"
  return author
}

export const getAvatarColor = ({data}: Props) =>{
  const userData = data.userId && typeof data.userId === "object" ? data.userId : null;
  const avatarColor = userData?.avatarColor || "#84A59D"
  return avatarColor
}
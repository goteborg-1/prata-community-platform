export interface Comment {
  id: number,
  postId: number,
  userId: string,
  isAnonymous: boolean,
  isPsychologist: boolean,
  content: string,
  createdAt: string,
  isEdited: boolean,
  likes: number,
  dislikes: number,
}

export type CommentParams = { postId: string; commentId: string }

export type CreateCommentBody = Omit<Comment, "id" | "createdAt" | "likes" | "dislikes" | "isEdited">
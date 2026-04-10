
// everything a comment needs
export interface Comment {
  id: number,
  postId: number, // matches the post it belongs to
  userId: string,
  isAnonymous: boolean,
  isPsychologist: boolean, // UI highlights/marks comment
  content: string,
  createdAt: string,
  isEdited: boolean, // UI shows "(edited)"
  likes: number,
  dislikes: number,
}


// parameters from the URL (to identify which post and comment)
export type CommentParams = { postId: string; commentId: string }


// what the frontend sends when creating a comment (backend sets the rest)
export type CreateCommentBody = Omit<Comment, "id" | "createdAt" | "likes" | "dislikes" | "isEdited">

// everything a comment needs
export interface Comment {
  postId: string, // matches the post it belongs to
  userId: string | null,
  isAnonymous: boolean,
  isPsychologist: boolean, // UI highlights/marks comment
  content: string,
  likedBy?: string[],
  likeCount: number,
  isEdited: boolean,
}


// parameters from the URL (to identify which post and comment)
export type CommentParams = { postId: string; commentId: string }


// what the frontend sends when creating a comment (backend sets the rest)
export type CreateCommentBody = Omit<Comment, "createdAt" | "likedBy" | "likeCount">



// ---- PATCH related types ----

export type UpdateCommentBody = Pick<Comment, "content">
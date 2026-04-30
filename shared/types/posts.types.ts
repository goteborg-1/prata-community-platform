export type Category =
  | "relationships" 
  | "family" 
  | "parenting" 
  | "stress" 
  | "anxiety" 
  | "loneliness" 
  | "grief-and-loss"
  | "depression"
  | "other";

export type TriggerTag = 
  | "self-harm"
  | "suicidal-thoughts"
  | "substance-abuse"
  | "gambling"
  | "eating-disorders"
  | "body-image"
  | "abuse"
  | "domestic-violence"
  | "trauma"

type UserId = string

export interface Post {
  id: string,
  userId: UserId | null,
  isAnonymous: boolean,
  title: string,
  description: string,
  categories: Category[],
  triggerTags: TriggerTag[],
  likedBy?: UserId[]
  likeCount: number,
  createdAt: string,
  updatedAt: string
}

export type PostParams = {id: string}

export type getPostQuery = {
  categories?: Category | Category[]
  triggerTags?: TriggerTag | TriggerTag[]
  search?: string
  sort?: "newest" | "popular"
  page?: string
  limit?: string
}

export type CreatePostBody = Omit<Post, "userId" | "id" | "likedBy">

export type UpdatePostBody = Partial<Pick<Post,"title" | "description" | "categories" | "triggerTags">>
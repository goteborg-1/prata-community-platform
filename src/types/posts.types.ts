type Category =
  | "relationships" 
  | "family" 
  | "parenting" 
  | "stress" 
  | "anxiety" 
  | "loneliness" 
  | "grief-and-loss"
  | "depression"
  | "other";

type Triggertag = 
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
  customId: number,
  userId: UserId,
  isAnonymous: boolean,
  title: string,
  description: string,
  categories: Category[],
  triggerTags: Triggertag[],
  likedBy: UserId[]
  createdAt: Date,
  updatedAt: Date
}

export type PostParams = {id: string}

export type getPostQuery = {
  categories?: Category | Category[]
  search?: string
  sort?: "newest" | "popular"
  page?: string
  limit?: string
}

export type CreatePostBody = Omit<Post, "userId" | "id" | "likedBy">

export type UpdatePostBody = Partial<Pick<Post,"title" | "description" | "categories" | "triggerTags">>
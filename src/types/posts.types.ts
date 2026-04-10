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

export interface Post {
  id: number,
  userId: string,
  isAnonymous: boolean,
  createdAt: string,
  title: string,
  description: string,
  categories: Category[],
  triggerTags: Triggertag[],
  likes: number
}



export type PostParams = {id: string}

export type getPostQuery = {
  categories?: Category | Category[]
  search?: string
  sort?: "newest" | "popular"
  page?: string
  limit?: string
}

export type CreatePostBody = Omit<Post, "userId" | "id" | "createdAt" | "likes">

export type UpdatePostBody = Partial<Pick<Post,"title" | "description" | "categories" | "triggerTags">>
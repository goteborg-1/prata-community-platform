type Category =
  | "relationships" 
  | "family" 
  | "parenting" 
  | "stress" 
  | "anxiety" 
  | "loneliness" 
  | "grief-and-loss"
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
  author: string,
  isAnonymous: boolean,
  createdAt: string,
  title: string,
  description: string,
  categories: Category[],
  triggerTags: Triggertag[],
  likes: number
}
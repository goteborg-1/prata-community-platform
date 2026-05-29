export const CATEGORY_OPTIONS = ["relationships", "family", "parenting", "stress", "anxiety", "loneliness", "grief-and-loss", "depression", "other"] as const

export const CATEGORY_LABELS: Record<string, string> = {
  "relationships": "Relationer",
  "family": "Familj",
  "parenting": "Föräldraskap",
  "stress": "Stress",
  "anxiety": "Ångest",
  "loneliness": "Ensamhet",
  "grief-and-loss": "Sorg & förlust",
  "depression": "Depression",
  "other": "Övrigt"
}

export const TRIGGER_OPTIONS =   ["self-harm", "suicidal-thoughts", "substance-abuse", "gambling", "eating-disorders", "body-image", "abuse", "domestic-violence", "trauma"] as const

export const TRIGGER_LABELS: Record<string, string> = {
  "self-harm": "Självskadebeteende",
  "suicidal-thoughts": "Självmordstankar",
  "substance-abuse": "Missbruk",
  "gambling": "Spelberoende",
  "eating-disorders": "Ätstörningar",
  "body-image": "Kroppsideal",
  "abuse": "Övergrepp",
  "domestic-violence": "Våld i nära relationer",
  "trauma": "Trauma"
}

export const REPORT_OPTIONS = ["spam", "hateSpeech", "harassment", "inappropriate", "misinformation", "other"]

export const REPORT_LABELS: Record<string, string> = {
  spam: "Spam",
  hateSpeech: "Hatspråk",
  harassment: "Trakasserier",
  inappropriate: "Olämpligt",
  misinformation: "Falsk info",
  other: "Annat"
}

export const AVATAR_COLORS = [
  "#84A59D", // accent
  "#F6BD60", // primary
  "#F5CAC3", // secondary
  "#A63D2D", // error
  "#747272", // muted
  "#423E3B", // dark
] as const

export const STATUS_OPTIONS = ["pending", "actionTaken", "dismissed"] as const

export const STATUS_LABELS: Record<string, string> = {
  pending: "Väntar",
  actionTaken: "Åtgärdad",
  dismissed: "Avvisad"
}

export const ROLE_OPTIONS = ["user", "psychologist", "admin"] as const

export const ROLE_LABELS: Record<string, string> = {
  user: "Användare",
  psychologist: "Psykolog",
  admin: "Administratör"
}

export const SORT_OPTIONS = ["newest", "popular"] as const

export type Sort = (typeof SORT_OPTIONS)[number]
export type Category = (typeof CATEGORY_OPTIONS)[number]
export type ReportReason = (typeof REPORT_OPTIONS)[number]
export type TriggerTag = (typeof TRIGGER_OPTIONS)[number]
export type AvatarColor = (typeof AVATAR_COLORS)[number]
export type Role = (typeof ROLE_OPTIONS)[number]
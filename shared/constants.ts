export const CATEGORY_OPTIONS = ["relationships", "family", "parenting", "stress", "anxiety", "loneliness", "grief-and-loss", "depression", "other"] as const

export const TRIGGER_OPTIONS =   ["self-harm", "suicidal-thoughts", "substance-abuse", "gambling", "eating-disorders", "body-image", "abuse", "domestic-violence", "trauma"] as const

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
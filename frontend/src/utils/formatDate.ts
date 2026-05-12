export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}
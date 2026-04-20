import app from "./app.js";
const PORT = process.env.HTTP_PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI) {
  console.error("MONGODB_URI is missing in .env")
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})
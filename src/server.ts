import app from "./app.js";
import connectToDatabase from "./config/database.js";

const PORT = process.env.HTTP_PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI) {
  console.error("MONGODB_URI is missing in .env")
  process.exit(1)
}

async function startServer() {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
  })
}

startServer()
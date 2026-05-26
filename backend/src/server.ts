import dotenv from "dotenv"
import app from "./app.js";
import connectToDatabase from "./config/database.js";

dotenv.config()

const PORT = Number(process.env.PORT) || Number(process.env.HTTP_PORT) || 3000
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if(!MONGODB_URI) {
  console.error("MONGODB_URI is missing in .env")
  process.exit(1)
}

if (!JWT_SECRET) {
  console.error("JWT_SECRET is missing - shutting down")
  process.exit(1)
}

async function startServer() {
  await connectToDatabase()
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening to port ${PORT}`)
  })
}

startServer()
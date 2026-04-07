import express from "express"
import postsRouter from "./routes/posts.js"

const app = express()
app.use(express.json())

const apiRouter = express.Router()
app.use("/api/v1", apiRouter)

apiRouter.use("/posts", postsRouter)
 
export default app
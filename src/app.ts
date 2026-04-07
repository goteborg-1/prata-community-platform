import express from "express"
import postsRouter from "./routes/posts.js"

import { notFound, errorHandler } from "./middleware/errorHandler.js"

const app = express()
app.use(express.json())

const apiRouter = express.Router()
app.use("/api/v1", apiRouter)

apiRouter.use("/posts", postsRouter)


// ---- ERROR HANDLERS (MUST COME LAST) ----
app.use(notFound);
app.use(errorHandler);

export default app
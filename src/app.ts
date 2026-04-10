import express from "express"
import cors from "cors"
import morgan from "morgan"
import { notFound, errorHandler } from "./middleware/errorHandler.js"

import postsRouter from "./routes/posts.routes.js"
import commentRouter from "./routes/comments.routes.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const apiRouter = express.Router()
app.use("/api/v1", apiRouter)

apiRouter.use("/posts", postsRouter)
apiRouter.use("/posts/:postId/comments", commentRouter)


// ---- ERROR HANDLERS (MUST COME LAST) ----
app.use(notFound);
app.use(errorHandler);

export default app
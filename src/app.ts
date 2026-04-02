import express from "express"

const app = express()
app.use(express.json())

const apiRouter = express.Router()
app.use("/api/v1", apiRouter)

export default app
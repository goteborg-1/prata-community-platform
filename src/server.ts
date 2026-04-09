import app from "./app.js";
const PORT = process.env.HTTP_PORT

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})
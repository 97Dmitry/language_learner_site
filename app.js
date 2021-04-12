const express = require("express")
require('dotenv').config()

// ROUTING
const userRouter = require("./routes/user.routes")
const wordRouter = require("./routes/word.routes")
const authRouter = require("./routes/auth.routes")


const PORT = process.env.PORT || 7000

const app = express()

app.use(express.json())
app.use("/api", userRouter)
app.use("/api", wordRouter)
app.use("/api", authRouter)


const start = () => {
  try {
    app.listen(PORT, () => console.log(`SERVER was been start on ${PORT} port!!!`))
  } catch (e) {
    console.log(e)
  }
}

start()
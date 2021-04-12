const express = require("express")
require('dotenv').config()
const userRouter = require("./routes/user.routes")
const wordRouter = require("./routes/word.routes")
const PORT = process.env.PORT || 7000



const app = express()
app.use(express.json())

app.use("/api", userRouter)
app.use("/api", wordRouter)

app.listen(PORT, () => console.log(`SERVER was been start on ${PORT} port!!!`))
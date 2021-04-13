const express = require("express")
require('dotenv').config()


const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// ROUTING
app.use("/api", require("./routes/user.routes"))
app.use("/api", require("./routes/word.routes"))
app.use("/api", require("./routes/auth.routes"))

const PORT = process.env.PORT || 7000
const start = () => {
  try {
    app.listen(PORT, () => console.log(`SERVER was been start on ${PORT} port!!!`))
  } catch (e) {
    console.log(e)
  }
}

start()
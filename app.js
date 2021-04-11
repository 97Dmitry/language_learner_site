const express = require(`express`)

const PORT = process.env.PORT || 7000
const app = express()


app.get(`/`, (request, response) => {
  response.send(`HELLO WORLD`)
})

app.listen(PORT, () => console.log(`SERVER was been start on ${PORT} port!!!`))
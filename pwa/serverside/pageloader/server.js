const { getData } = require("./getData.js")
const express = require("express")
const cors = require("cors")
const app = express()
const data = require("./temp.json")

app.use(cors())

app.get("/api", (request, response) => {
  // getData().then(data => {
  //   response.send(JSON.stringify(data))
  // }).catch(error => {
  //   console.log(error)
  //   response.send("error")
  // })
  response.send(data)
})

const server = app.listen(80, () => {
  const { address, port } = server.address()
  console.log(`Server running at ${address}:${port}`)
})

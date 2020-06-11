const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const https = require('https')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ssl certs
const privateKey = fs.readFileSync(path.join(__dirname, '/scripts/server.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '/scripts/server.cert'), 'utf8')
const credentials = {
  key: privateKey,
  cert: certificate
}

app.post('/fb-getdata', async (req, res) => {
  const accessToken = req.body.accessToken
  const userData = 'id,name,birthday,email'
  let response = {data:{}}
  console.log(`accessToken: ${accessToken}`)

  try {
    response = await axios.get(`https://graph.facebook.com/v7.0/me?fields=${userData}&access_token=${accessToken}`)
  } catch (err) {
    console.log(err)
  }

  res.status(200).send(response.data)
})

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(PORT, () => {
  console.log(`listening on https://localhost:${PORT}`)
})
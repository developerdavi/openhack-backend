const express = require('express');
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')

if (!process.env.now) require('dotenv').config()

require('./Config/db')

app.use(cors({ credentials: true }))

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`) 
  next()
})

require('./routes')(app)

http.listen(process.env.port || 4100, () => {
  console.log('[SERVER] Started')
})

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
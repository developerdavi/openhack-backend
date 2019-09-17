const express = require('express');
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')

require('./Config/db')

app.use(cors({ credentials: true }))

app.use(bodyParser.json())

require('./routes')(app)

http.listen(4000, () => {
  console.log('[SERVER] Started')
})
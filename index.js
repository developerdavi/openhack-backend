const express = require('express');
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const { LanguagesAI } = require('./TeamMatchingAI/model')

app.use(cors({ credentials: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ data: 'Hello world' })
})

app.post('/test', (req, res) => {
  const people = req.body.people

  let results = []

  people.forEach((element, index) => {
    let better
    people.forEach((e, i) => {
      if (i === index) return

      const languageClassifier = new LanguagesAI([element.language, e.language])

      const prediction = languageClassifier.run()

      if (better.result < prediction) 
        better = { result: prediction, e1: element, e2: e }
    })
    results.push(better)
  })

  res.json(results)
})

http.listen(3200, () => {
  console.log('[SERVER] Started')
})
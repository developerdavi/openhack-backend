const express = require('express');
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const { ExperienceAI } = require('./TeamMatchingAI/model')
const { compare, train } = require('./TeamMatchingAI/util')

app.use(cors({ credentials: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ data: 'Hello world' })
})

app.post('/test', async (req, res) => {
  
})

const testAI = async (data) => {

  await train().then(() => console.log('Finished training'))

  return new Promise(async resolve => {

    const people = data
  
    let results = []

    for (let index = 0; index < people.length; index++) {
      let better = { data: [0] }

      const p1 = people[index]
      
      for (let j = 0; j < people.length; j++) {
        if (index == j) continue
        
        const p2 = people[j]

        let result = await compare(p1, p2)

        if (result[0] > better.data[0])
          better = {p1: p1.experience, p2: p2.experience, data: result}

        console.log(`[${index}] ${p1.experience} + ${p2.experience} = ${result}`)
      }

      results.push(better)
    }
  
    resolve(results)
  })
}

testAI([
  {
    experience: 10
  },
  {
    experience: 8
  },
  {
    experience: 6
  },
  {
    experience: 4
  },
  {
    experience: 2
  },
  {
    experience: 0
  },
  {
    experience: 0
  },
  {
    experience: 0
  }
]).then(console.log)

http.listen(3200, () => {
  console.log('[SERVER] Started')
})
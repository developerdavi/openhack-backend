const express = require('express');
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const { ExperienceAI } = require('./TeamMatchingAI/model')

app.use(cors({ credentials: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ data: 'Hello world' })
})

app.post('/test', async (req, res) => {
  
})

const testAI = async (data) => {
  return new Promise(async resolve => {

    const people = data
  
    let results = []
  
    var AI
  
    for (let index = 0; index < people.length / 2; index++) {
      let better = 0

      const p1 = people[index]
      
      for (let j = 0; j < people.length; j++) {
        if (index == j) continue
        
        const p2 = people[j]

        let input = p1.experience >= p2.experience ? p1.experience - p2.experience : p2.experience - p1.experience
  
        AI = new ExperienceAI([input])
  
        let data = await AI.run()

        if (data[0] > better) {
          results.push({p1: p1.experience, p2: p2.experience, data})
          better = data[0]
        }
  
      }
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
  }
]).then(console.log)

http.listen(3200, () => {
  console.log('[SERVER] Started')
})
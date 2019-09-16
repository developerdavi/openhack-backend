const { ExperienceAI, CompareAI } = require('./models')

const expAI = new ExperienceAI()
const compareAI = new CompareAI()

const compare = async (p1, p2) => {
  let allResults = [0,0,0,0]

  // COMPARE EXPERIENCES
  let input = p1.experience >= p2.experience ? p1.experience - p2.experience : p2.experience - p1.experience
  
  let data = await expAI.run([input])

  allResults[0] = data[0] * 2

  p1.language.forEach(lang => {
    allResults[1] += p2.language.includes(lang) ? 0.5 : 0
  })

  allResults[2] += p1.area === p2.area ? -0.5 : 1

  allResults[3] += p1.interest === p2.interest ? 1 : 0

  const sum = allResults[0] + allResults [1] + allResults[2] + allResults [3]

  return sum
}

const train = async () => {
  await expAI.train()
}

module.exports = {
  testAI: async (data) => {
    await train()
  
    return new Promise(async resolve => {
      const people = data
    
      let results = []
      let matched = []
  
      for (let index = 0; index < people.length; index++) {
        let better = { match: 0 }
        
        const p1 = people[index]

        if (matched.includes(p1.id)) continue
        
        for (let j = 0; j < people.length; j++) {
          if (index == j) continue
          
          const p2 = people[j]
          
          if (matched.includes(p2.id)) continue
  
          let result = await compare(p1, p2)
  
          if (result > better.match)
            better = {p1, p2, match: result}
        }
  
        results.push(better)
        matched.push(better.p1.id)
        matched.push(better.p2.id)
      }
    
      resolve(results)
    })
  }
}
const { ExperienceAI, CompareAI } = require('./model')

const expAI = new ExperienceAI()
const compareAI = new CompareAI()

module.exports = {
  compare: async (p1, p2) => {
    let allResults = [0,0,0,0]

    // COMPARE EXPERIENCES
    let input = p1.experience >= p2.experience ? p1.experience - p2.experience : p2.experience - p1.experience
    
    let data = await expAI.run([input])

    allResults[0] = data[0]

    p1.language.forEach(lang => {
      allResults[1] += p2.language.includes(lang) ? 0.5 : 0
    })

    allResults[2] += p1.area === p2.area ? -0.5 : 1

    const sum = allResults[0] + allResults [1] + allResults[2] + allResults [3]

    return sum
  },
  train: async () => {
    await expAI.train()
  }
}
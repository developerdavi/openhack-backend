const { ExperienceAI } = require('./model')

const expAI = new ExperienceAI()

module.exports = {
  compare: async (p1, p2) => {
    let allResults = [0,0,0,0]

    // COMPARE EXPERIENCES
    let input = p1.experience >= p2.experience ? p1.experience - p2.experience : p2.experience - p1.experience
    
    let data = await expAI.run([input])

    allResults[0] = data[0]

    return allResults
  },
  train: async () => {
    await expAI.train()
  }
}
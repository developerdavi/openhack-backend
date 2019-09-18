const { ExperienceAI, LanguagesAI } = require('./models')

const expAI = new ExperienceAI()
const languagesAI = new LanguagesAI()

// GLOBAL VARIABLES
var loss = 0
var input = 0

const compare = async (p1, p2) => {
  let allResults = [0, 0, 0, 0]
  let data

  p1 = p1.tech_info
  p2 = p2.tech_info

  // COMPARE EXPERIENCES
  input =
    p1.experience >= p2.experience
      ? p1.experience - p2.experience
      : p2.experience - p1.experience

  data = await expAI.run([input])

  allResults[0] = data[0]

  // COMPARE PROGRAMMING LANGUAGES
  p1.programmingLanguages.forEach(lang => {
    input = p2.programmingLanguages.includes(lang) ? 1 : 0
  })

  data = await languagesAI.run([input])

  allResults[1] = data[0]

  // COMPARE DEVELOPMENT AREA
  input = p1.area === p2.area ? 1 : 0

  allResults[2] = p1.area === p2.area ? -0.5 : 1

  allResults[3] = p1.interest === p2.interest ? 1 : 0

  const sum = allResults[0] + allResults[1] + allResults[2] + allResults[3]

  return sum
}

const train = () => {
  return new Promise(async resolve => {
    let x, y
    x = await expAI.train()
    y = await languagesAI.train()
    resolve(y)
  })
}

module.exports = {
  testAI: async data => {
    loss = await train()
    return new Promise(async resolve => {
      const people = data

      let results = []
      let matched = []

      for (let index = 0; index < people.length; index++) {
        let better = { match: 0 }

        const p1 = people[index]

        if (matched.includes(p1._id)) continue

        for (let j = 0; j < people.length; j++) {
          if (index == j) continue

          const p2 = people[j]

          if (matched.includes(p2._id)) continue

          let result = await compare(p1, p2)

          if (result > better.match) better = { p1, p2, match: result }
        }

        results.push(better)
        if (better.p1) {
          matched.push(better.p1._id)
          matched.push(better.p2._id)
        }
      }

      let precision = 100 - loss * 100

      resolve({ precision: `${precision}%`, matching: results })
    })
  }
}

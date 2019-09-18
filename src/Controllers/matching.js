const { testAI } = require('../TeamMatchingAI')
const users = require('../Model/users')

module.exports = {
  test: async (req, res) => {
    let docs = await users.find({ type: 'participant' })

    testAI(docs).then(data => {
      res.json({ original: docs, results: data })
    })
  }
}

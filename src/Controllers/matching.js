const { testAI } = require('../TeamMatchingAI')
const users = require('../Model/users')

module.exports = {
  test: async (req, res) => {
    let data = await users.find({type: 'participant'})

    await testAI(data).then(data => {
      res.json({original: data, results: data})
    })
  }
}
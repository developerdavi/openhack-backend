const fakeData = require('../fakeData')
const { testAI } = require('../TeamMatchingAI')

module.exports = {
  test: async (req, res) => {
    await testAI(fakeData).then(data => {
      res.json({original: fakeData, results: data})
    })
  }
}
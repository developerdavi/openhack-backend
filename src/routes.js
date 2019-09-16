const MatchingController = require('./Controllers/matching')

const Routes = routes => {
  routes.get('/', (req, res) => {
    res.json({ data: 'Hello world' })
  })

  routes.get('/test', MatchingController.test)
}

module.exports = Routes
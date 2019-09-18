const MatchingController = require('./Controllers/matching')
const UsersController = require('./Controllers/users')

require('dotenv').config()

const Routes = routes => {
  routes.get('/', (req, res) => {
    res.json({ data: 'Hello world' })
  })

  // A.I.
  routes.get('/test', MatchingController.test)

  // USERS
  routes.get('/users', UsersController.index)
  routes.get('/user/:id', UsersController.get)
  routes.post('/user', UsersController.create)
  routes.put('/user', UsersController.update)
  routes.delete('/user/:id', UsersController.delete)

  // DEBUG ONLY
  routes.get('/mongopassword', (req, res) => res.json({password: process.env.MONGOPWD}))
}

module.exports = Routes
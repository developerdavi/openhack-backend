const MatchingController = require('./Controllers/matching')
const UsersController = require('./Controllers/users')

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
  // routes.get('/mongopassword', (req, res) => res.json({password: process.env.mongopwd}))
  // routes.get('/env', (req, res) => res.json(process.env))
}

module.exports = Routes
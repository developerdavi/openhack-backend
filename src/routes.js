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
}

module.exports = Routes
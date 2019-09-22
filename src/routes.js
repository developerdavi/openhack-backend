const MatchingController = require('./Controllers/matching')
const UsersController = require('./Controllers/users')
const TeamsController = require('./Controllers/teams')
const HackathonsController = require('./Controllers/hackathons')
const FeedbacksController = require('./Controllers/feedbacks')

const Routes = routes => {
  routes.get('/', (req, res) => {
    res.json({ data: 'Hello world' })
  })

  // A.I.
  routes.get('/test', MatchingController.test)
  routes.get('/match', MatchingController.match)

  // USERS
  routes.get('/users', UsersController.index)
  routes.delete('/users/massive', UsersController.deleteMassive)
  routes.get('/user/:id', UsersController.get)
  routes.post('/user', UsersController.create)
  routes.put('/user', UsersController.update)
  routes.delete('/user/:id', UsersController.delete)
  routes.post('/generate_users', UsersController.createRandomUsers)

  // TEAMS
  routes.get('/teams', TeamsController.index)
  routes.get('/team/:id', TeamsController.get)
  routes.post('/team', TeamsController.create)
  routes.put('/team', TeamsController.update)
  routes.delete('/team/:id', TeamsController.delete)

  // HACKATHONS
  routes.get('/hackathons', HackathonsController.index)
  routes.get('/hackathon/:id', HackathonsController.get)
  routes.post('/hackathon', HackathonsController.create)
  routes.put('/hackathon', HackathonsController.update)
  routes.delete('/hackathon/:id', HackathonsController.delete)

  // FEEDBACKS
  routes.get('/feedbacks', FeedbacksController.index)
  routes.get('/feedback/:id', FeedbacksController.get)
  routes.post('/feedback', FeedbacksController.create)
  routes.put('/feedback', FeedbacksController.update)
  routes.delete('/feedback/:id', FeedbacksController.delete)

  // DEBUG ONLY
  // routes.get('/mongopassword', (req, res) => res.json({password: process.env.mongopwd}))
  // routes.get('/env', (req, res) => res.json(process.env))
}

module.exports = Routes
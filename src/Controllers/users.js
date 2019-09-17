const users = require('../Model/users')

module.exports = {
  index: async (req, res) => {
    const docs = await users.find()

    res.json({data: docs})
  },
  get: async (req, res) => {
    const { id } = req.params

    try {
      const user = await users.findById(id)
      res.json(user)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  create: async (req, res) => {
    const user = req.body

    try {
      await users.create(user)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  update: async (req, res) => {
    const user = req.body

    user.updatedAt = undefined

    try {
      await users.findByIdAndUpdate(user._id, user)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await users.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
const teams = require('../Model/teams')

module.exports = {
  index: async (req, res) => {
    const docs = await teams.find()

    res.json({data: docs})
  },
  get: async (req, res) => {
    const { id } = req.params

    try {
      const team = await teams.findById(id)
      res.json(team)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  create: async (req, res) => {
    const team = req.body

    try {
      await teams.create(team)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  update: async (req, res) => {
    const team = req.body

    team.updatedAt = undefined

    try {
      await teams.findByIdAndUpdate(team._id, team)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await teams.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
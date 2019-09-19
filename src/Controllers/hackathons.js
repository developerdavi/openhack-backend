const hackathons = require('../Model/hackathons')

module.exports = {
  index: async (req, res) => {
    const docs = await hackathons.find()

    res.json({data: docs})
  },
  get: async (req, res) => {
    const { id } = req.params

    try {
      const hackathon = await hackathons.findById(id)
      res.json(hackathon)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  create: async (req, res) => {
    const hackathon = req.body

    try {
      await hackathons.create(hackathon)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  update: async (req, res) => {
    const hackathon = req.body

    hackathon.updatedAt = undefined

    try {
      await hackathons.findByIdAndUpdate(hackathon._id, hackathon)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await hackathons.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
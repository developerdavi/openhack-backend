const feedbacks = require('../Model/feedbacks')

module.exports = {
  index: async (req, res) => {
    const docs = await feedbacks.find()

    res.json({data: docs})
  },
  get: async (req, res) => {
    const { id } = req.params

    try {
      const feedback = await feedbacks.findById(id)
      res.json(feedback)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  create: async (req, res) => {
    const feedback = req.body

    try {
      await feedbacks.create(feedback)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  update: async (req, res) => {
    const feedback = req.body

    feedback.updatedAt = undefined

    try {
      await feedbacks.findByIdAndUpdate(feedback._id, feedback)
      res.sendStatus(201)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await feedbacks.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
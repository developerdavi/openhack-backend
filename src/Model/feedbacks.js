const { model, Schema } = require('mongoose')

const feedbackSchema = new Schema({
  type: String,
  p1: Object,
  p2: Object,
  value: Number
})

module.exports = model('feedbacks', feedbackSchema)

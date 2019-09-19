const { Schema, model } = require('mongoose')

const hackathonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: ''
    },
    teams: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    description: {
      type: String,
      required: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('hackathons', hackathonSchema)

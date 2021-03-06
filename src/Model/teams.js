const { Schema, model } = require('mongoose')

const teamSchema = new Schema(
  {
    number: {
      type: Number,
      required: true
    },
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
      default: []
    },
    matchRate: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('teams', teamSchema)

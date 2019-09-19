const { Schema, model } = require('mongoose')

const hackatonSchema = new Schema(
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

module.exports = model('hackatons', hackatonSchema)

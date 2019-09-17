const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  tech_info: {
    type: Object,
    required: true,
    default: {
      programmingLanguages: [],
      experience: 0,
      area: '',
      interest: ''
    }
  },
  type: {
    type: String,
    default: 'participant'
  }
}, {
  timestamps: true
})

module.exports = model('users', userSchema)
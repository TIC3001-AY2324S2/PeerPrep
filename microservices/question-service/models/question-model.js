const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter question title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter question description'],
  },
  category: {
    type: String,
    required: [true, 'Please enter question category'],
  },
  complexity: {
    type: String,
    required: [true, 'Please enter question complexity'],
  }
})

module.exports = mongoose.model('Question', questionSchema)
import mongoose from 'mongoose';

const {Schema} = mongoose;

const questionSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    required: true
  },
  questionTitle: {
    type: String,
    required: true
  },
  questionDesc: {
    type: String,
    required: true
  },
  questionCat: {
    type: String,
    required: true
  },
  questionComplexity: {
    type: String,
    required: true
  },
  questionLink: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
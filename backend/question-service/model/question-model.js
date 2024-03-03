import mongoose from "mongoose";

var Schema = mongoose.Schema;

let QuestionModelSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: {
    type: Number,
    required: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  complexity: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
});

export default mongoose.model("QuestionModel", QuestionModelSchema, "question_repo");
import QuestionModel from "./question-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDBUri =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("connected", () => console.log("MongoDB Connected!"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function findAllQuestion() {
  return QuestionModel.find();
}

export async function findQuestionByID(id) {
  return QuestionModel.findOne({ id: id });
}

export async function findOneQuestionByComplexity(complexity) {
  return QuestionModel.aggregate([
    { $match: { complexity: complexity } },
    { $sample: { size: 1 } }
  ]);
}

export async function createQuestion({ title, description, category, complexity }) {
  const lastQuestion = await QuestionModel.findOne().sort('-id');
  const highestId = lastQuestion ? lastQuestion.id : 0;
  const newQuestion = new QuestionModel({
    _id: new mongoose.Types.ObjectId(),
    id: highestId + 1, title: title, description: description, category: category, complexity: complexity
  });
  return await newQuestion.save();
}
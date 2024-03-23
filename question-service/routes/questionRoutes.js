import express from 'express';
import Question from '../models/question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
  console.log("GETTING all questions")
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new question
router.post("/", async (req, res) => {
  console.log("CREATE new question \nJSON start: ----------------------------");
  console.log(req.body);
  console.log("JSON end    ----------------------------");
  try {
    const { questionID, questionTitle, questionDesc, questionCat, questionComplexity, questionLink } = req.body;
    const question = new Question({
      questionID,
      questionTitle,
      questionDesc,
      questionCat,
      questionComplexity,
      questionLink
    });
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a question by ID
router.patch("/:questionID", async (req, res) => {
  const {questionID} = req.params;
  console.log("PATCHING question id: "+ questionID)
  console.log(questionID)
  console.log("JSON start: ----------------------------");
  console.log(req.body);
  console.log("JSON end    ----------------------------");
  try {
    const updatedQuestion = await Question.findOneAndUpdate(
      { questionID: questionID },
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a question by ID
router.delete('/:questionID', async (req, res) => {
  const {questionID} = req.params;
  console.log("DELETING question id: "+ questionID)
  console.log(questionID)
  console.log("JSON start: ----------------------------");
  console.log(req.body);
  console.log("JSON end    ----------------------------");
  try {
    const deletedQuestion = await Question.findOneAndDelete({ questionID });
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
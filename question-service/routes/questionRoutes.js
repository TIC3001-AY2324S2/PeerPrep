import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Question from '../models/question.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  }
});

// Multer upload instance
const upload = multer({ storage: storage });

async function generateUniqueID() {
  try {
    // Find the highest questionID in the database
    const highestQuestion = await Question.findOne().sort({ questionID: -1 }).exec();

    // If no questions exist in the database, start with questionID = 1
    if (!highestQuestion) {
      return 1;
    }

    // Increment the highest questionID by 1 to generate a unique ID
    return highestQuestion.questionID + 1;
  } catch (error) {
    console.error('Error generating unique ID:', error);
    throw error; // Propagate the error
  }
}

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  console.log("UPLOADing JSON file \n----------------------------");
  let qID = await generateUniqueID();
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf8'); // Read file content
    const jsonData = JSON.parse(fileContent); // Parse JSON data
    let skippedQuestions = [];

    // Iterate over each JSON object in the file
    for (const data of jsonData) {
      // Check if any existing question already has a similar title (partial match)
      const existingQuestion = await Question.findOne({ questionTitle: { $regex: data.questionTitle, $options: 'i' } });

      if (existingQuestion) {
        skippedQuestions.push(data.questionTitle); // Add skipped question title to array
        console.log(`Skipped question with title: ${data.questionTitle} as a similar title already exists`);
        continue; // Skip adding this question and proceed to the next iteration
      }

      const question = new Question({
        questionID: qID,
        questionTitle: data.questionTitle,
        questionDesc: data.questionDesc,
        questionCat: data.questionCat,
        questionComplexity: data.questionComplexity,
        questionLink: data.questionLink
      });
      // Insert the object into the database
      await question.save();
      qID ++;
    }

    // Construct the response message
    let message = 'File uploaded and data inserted successfully';
    if (skippedQuestions.length > 0) {
      message += `. Skipped questions with similar titles: ${skippedQuestions.join(', ')}`;
    }

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  console.log("UPLOADing end    ----------------------------");
});

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

    // Check if any existing question already has a similar title
    const existingQuestion = await Question.findOne({ questionTitle: { $regex: questionTitle, $options: 'i' } });

    if (existingQuestion) {
      return res.status(400).json({ message: 'A question with a similar title already exists.' });
    }

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
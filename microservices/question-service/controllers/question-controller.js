const Question = require('../models/question-model')

// @desc    Fetch all questions
// @route   GET /api/question
// @access  Public
const fetchAllQuestions = async (req, res) => {
  const questions = await Question.find({})
  res.status(200).json(questions)
}

// @desc    Fetch all question categories
// @route   GET /api/question/categories
// @access  Public
const fetchAllQuestionCategories = async (req, res) => {
  const questionCategories = await Question.find({})
  res.status(200).json(questionCategories)
}

// @desc    Create a question
// @route   POST /api/question
// @access  Public
const addQuestion = async (req, res) => {
  const { title, description, category, complexity } = req.body

  if (!title || !description || !category || !complexity) {
    return res.status(400).json({ message: 'Please enter all fields.' })
  }

  try {
    const question = await Address.create({
      title,
      description,
      category, 
      complexity
    })

    res.status(201).json({
      _id: question._id,
      title: question.title,
      description: question.description,
      category: question.category,
      complexity: question.complexity,
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid question data.' })
  }
}

// @desc    Create a question
// @route   PUT /api/question
// @access  Public
const updateQuestion = async (req, res) => {
  const { title, description, category, complexity }= req.body

  if (!title || !description || !category || !complexity) {
    return res.status(400).json({ message: 'Please enter all fields.' })
  }

  try {
    const question = await Question.findById(req.params.id)

    question.title = title
    question.description = description
    question.category = category
    question.complexity = complexity

    await question.save()

    res.status(200).json({
      _id: question._id,
      title: question.title,
      description: question.description,
      category: question.category,
      complexity: question.complexity,
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid question data.' })
  }
}

// @desc    Delete a question
// @route   DELETE /api/question
// @access  Public
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    await question.deleteOne()   
    res.status(200).json({ message: 'Question removed' })
  } catch (error) {
    res.status(404).json({ message: 'Question not found' })
  }
}

module.exports = { fetchAllQuestions, fetchAllQuestionCategories, addQuestion, updateQuestion, deleteQuestion }
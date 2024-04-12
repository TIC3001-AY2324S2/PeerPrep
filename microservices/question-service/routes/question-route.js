const express = require('express')
const router = express.Router()

const { fetchAllQuestions, fetchAllQuestionCategories, addQuestion, updateQuestion } = require('../controllers/question-controller')

// GET request http://localhost:8080/api/question
router.route('/').get(fetchAllQuestions)

// GET request http://localhost:8080/api/question/categories
router.route('/').get(fetchAllQuestionCategories)

// POST request http://localhost:8080/api/question
router.route('/').post(addQuestion)

// PUT request http://localhost:8080/api/question
router.route('/:id').put(updateQuestion)

// DELETE request http://localhost:8080/api/question
router.route('/:id').delete(deleteQuestion)

module.exports = router

const express = require('express');
const router = express.Router();
import { verifyAccessToken, verifyEmail, verifyId, verifyIsAdmin } from "../middleware/basic-access-control.js";
import { getAllQuestions } from "../controller/question-controller.js";

//return all question
router.get('/api/question/all', verifyAccessToken, verifyIsAdmin, getAllQuestions);

module.exports = router;
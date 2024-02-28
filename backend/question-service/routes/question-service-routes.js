const express = require('express');
const router = express.Router();
import { verifyAccessToken, verifyIsAdmin } from "../middleware/basic-access-control.js";
import { getAllQuestion } from "../controller/question-controller.js";

//return all question
router.get('/api/question/all', verifyAccessToken, verifyIsAdmin, getAllQuestion);

module.exports = router;
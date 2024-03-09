import express from "express";
const router = express.Router();
// import { verifyAccessToken, verifyIsAdmin } from "../middleware/basic-access-control.js";
import { getAllQuestion, getQuestionById, createQuestion } from "../controller/question-controller.js";

//return all question given active login + admin user
//router.get('/api/question/all', verifyAccessToken, verifyIsAdmin, getAllQuestion);
router.get('/api/question/all', getAllQuestion); //for testing

//return question by id
//router.get('/api/question/:id', getQuestionById); 

//create a single question and store in collection
router.post('/api/question/create', createQuestion);

export default router;
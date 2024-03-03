import express from "express";
const router = express.Router();
// import { verifyAccessToken, verifyIsAdmin } from "../middleware/basic-access-control.js";
import { getAllQuestion, getQuestionById } from "../controller/question-controller.js";

//return all question
//router.get('/api/question/all', verifyAccessToken, verifyIsAdmin, getAllQuestion);
router.get('/api/question/all', getAllQuestion);

router.get('/api/question/:id', getQuestionById);

export default router;
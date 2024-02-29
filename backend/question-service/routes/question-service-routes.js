import express from "express";
const router = express.Router();
// import { verifyAccessToken, verifyIsAdmin } from "../middleware/basic-access-control.js";
import { getAllQuestion } from "../controller/question-controller.js";

//return all question
//router.get('/api/question/all', verifyAccessToken, verifyIsAdmin, getAllQuestion);
router.get('/api/question/all', getAllQuestion);

export default router;
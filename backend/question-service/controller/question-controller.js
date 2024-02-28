import { ormFindAllQuestion as _findAllQuestion } from "../model/question-orm.js";


export async function getAllQuestion(req, res) {
    console.log(`GET ALL Question`);
  
    const response = await _findAllQuestion();
  
    console.log(response);
  
    if (response === null) {
      return res.status(404).json({ message: `No Question In Repository` });
    } else if (response.err) {
      return res.status(400).json({ message: "Error With Question Repository" });
    } else {
      console.log(`Questions loaded!`);
      return res.status(200).json({
        message: `Questions loaded!`,
        users: response,
      });
    }
  }
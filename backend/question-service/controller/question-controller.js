import {
  ormFindAllQuestion as _findAllQuestion,
  ormFindQuestionByID as _findQuestionByID,
} from "../model/question-orm.js";


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
      questions: response,
    });
  }
}

export async function getQuestionById(req, res) {
  const id = req.params.id;
  console.log(`GET QUESTION BY ID: ${id}`);

  const response = await _findQuestionByID(id);

  console.log(response);

  if (response === null) {
    return res.status(404).json({ message: `Question Not Found` });
  } else if (response.err) {
    return res.status(400).json({ message: "Error With Question Repository" });
  } else {
    console.log(`Questions loaded!`);
    return res.status(200).json({
      message: `Questions loaded!`,
      question: response,
    });
  }
}
import {
  ormFindAllQuestion as _findAllQuestion,
  ormFindQuestionByID as _findQuestionByID,
  ormFindOneQuestionByComplexity as _findOneQuestionByComplexity,
  ormCreateQuestion as _createQuestion,
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

export async function getOneQuestionByComplexity(req, res) {
  const complexity = req.params.complexity;
  console.log(`GET A QUESITON OF COMPLEXTY : ${complexity}`);

  const response = await _findOneQuestionByComplexity(complexity);

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

export async function createQuestion(req, res) {
  try {
    
    const { title, description, category, complexity } = req.body;
    const newQuestion = { title, description, category, complexity }
    if (newQuestion) {
      console.log(`Adding new question: ${title}`);
      const resp = await _createQuestion(title, description, category, complexity);
      console.log(resp);
      if (resp.err) {
        console.log(resp.err.message);
        return res.status(409).json({
          message:
            "Could not create new question. Title already exists in repository!",
        });
      } else {
        console.log(`New question: ${title} added successfully!`);
        return res
          .status(201)
          .json({ message: `New question: ${title} added successfully!` });
      }
    } else {
      return res.status(400).json({
        message: "Incomplete Question Data! Please provide all required fields!",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new question!" });
  }
}
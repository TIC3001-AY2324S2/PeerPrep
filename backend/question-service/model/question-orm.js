//for db itneraction
import {
    findQuestionByID,
    findAllQuestion,
    findOneQuestionByComplexity,
    createQuestion,
    deleteQuestion,
  } from "./repository.js";

export async function ormFindAllQuestion() {
  try {
    const result = await findAllQuestion();

    // Checking if question exist
    if (result.length !== 0) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not load questions from repository!");
    return { err };
  }
}

export async function ormFindQuestionByID(id) {
  try {
    const result = await findQuestionByID(id);

    // Checking if question exist
    if (result.length !== 0) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not load question from repository!");
    return { err };
  }
}

export async function ormFindOneQuestionByComplexity(complexity) {
  try {
    const result = await findOneQuestionByComplexity(complexity);

    // Checking if question exist
    if (result.length !== 0) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not load question from repository!");
    return { err };
  }
}

export async function ormCreateQuestion(title, description, category, complexity) {
  try {
    const newQuestion = await createQuestion({ title, description, category, complexity });
    return true;
  } catch (err) {
    console.log("ERROR: Could create question in repository!");
    return { err };
  }
}

export async function ormDeleteQuestion(id) {
  try {
    const result = await deleteQuestion(id);

    // Checking if User existed
    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not delete question");
    return { err };
  }
}
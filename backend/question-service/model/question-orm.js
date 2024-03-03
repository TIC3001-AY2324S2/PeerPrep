//for db itneraction
import {
    findQuestionByID,
    findAllQuestion
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

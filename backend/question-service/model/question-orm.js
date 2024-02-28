//for db itneraction
import {
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
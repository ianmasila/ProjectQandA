import { executeQuery } from "../database/database.js";

const createAnswer = async (userId, questionId, optionId) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3);",
    userId,
    questionId,
    optionId,
  );
};

const isCorrect = async (optionId) => {
  const result = await executeQuery(
    `SELECT is_correct AS "isCorrect" FROM question_answer_options WHERE id=$1;`,
    optionId,
  );

  return result.rows;
};

const findCorrectOption = async (questionId) => {
  const result = await executeQuery(
    `SELECT option_text FROM question_answer_options WHERE question_id=$1 AND is_correct=TRUE;`,
    questionId
  );

  return result.rows;
};


export { createAnswer, isCorrect, findCorrectOption };

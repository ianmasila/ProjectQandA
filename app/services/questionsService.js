import { executeQuery } from "../database/database.js";

const getQuestion = async (questionId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE id=$1;",
    questionId,
  );

  return result.rows;
};

const createOption = async (questionId, optionText, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);",
    questionId,
    optionText,
    isCorrect,
  );
};

const getOptions = async (questionId) => {
  const result = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id=$1;",
    questionId,
  );

  return result.rows;
};

const deleteOption = async (optionId) => {
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id=$1;",
    optionId,
  );   // ON DELETE CASCADE on for child table question_answers
};

const deleteQuestion = async (questionId) => {
  await executeQuery(
    "DELETE FROM questions WHERE id=$1;",
    questionId,
  ); 
}

export { createOption, getQuestion, getOptions, deleteOption, deleteQuestion };

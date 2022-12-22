import { executeQuery } from "../database/database.js";

// const getRandomQuestion = async () => {
//     const result = await executeQuery(
//       `SELECT questions.id AS questionId, questions.question_text AS questionText, question_answer_options.option_text AS answerOptions
//        FROM questions, question_answer_options WHERE question_answer_options.question_id=questions.id 
//        GROUP BY questions.id ORDER BY RANDOM() LIMIT 1;`,
//     );
  
//     return result.rows();
// }

const getRandomQuestion = async () => {
    const question = await executeQuery(
      `SELECT id AS "questionId", question_text AS "questionText" FROM questions ORDER BY RANDOM() LIMIT 1;`,
    );

    return question.rows;  
}

const getApiOptions = async (questionId) => {
  const result = await executeQuery(
    `SELECT id AS "optionId", option_text AS "optionText" FROM question_answer_options WHERE question_id=$1;`,
    questionId,
  );

  return result.rows;
};


export { getRandomQuestion, getApiOptions }
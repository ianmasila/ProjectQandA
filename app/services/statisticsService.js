import { executeQuery } from "../database/database.js";

const getAllCounts = async () => {
    const result = await executeQuery(
        `SELECT (SELECT COUNT(*) FROM topics) AS "topicsCount", (SELECT COUNT(*) FROM questions) AS "questionsCount", 
        (SELECT COUNT(*) FROM question_answers) AS "questionAnswersCount";`
    );

    return result.rows;
}

export { getAllCounts }
import { executeQuery } from "../database/database.js";

const createTopic = async (name, userId) => {
  await executeQuery(
    "INSERT INTO topics (name, user_id) VALUES ($1, $2);",
    // "UPDATE topics SET name=$1, user_id=$2 WHERE user_id IN (SELECT id FROM users WHERE admin = true);",
    name,
    userId,
  );
};

const deleteTopic = async (id) => {
  await executeQuery(
    "DELETE FROM topics WHERE id=$1;", // ON DELETE CASCADE active on child tables
    id,
  );
};

const getTopics = async () => {
  const result = await executeQuery(
    "SELECT * FROM topics ORDER BY name ASC"
  );

  return result.rows;
}

const createQuestion = async (userId, topicId, questionText) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($1, $2, $3);",
    userId, 
    topicId, 
    questionText
  );
};

const getTopicQuestions = async (topicId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id=$1;",
    topicId
  );

  return result.rows;
}

const getRandomQuestion = async (topicId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id=$1 ORDER BY RANDOM() LIMIT 1;",
    topicId
  );

  return result.rows;
}

const getTopicNameById = async (topicId) => {
  const result = await executeQuery(
    "SELECT name FROM topics WHERE id=$1;",
    topicId
  );

  return result.rows;
}

export { createTopic, deleteTopic, getTopics, createQuestion, getTopicQuestions, getRandomQuestion, getTopicNameById };

import { executeQuery } from "../database/database.js";

const addUser = async (email, passwordHash) => {
  await executeQuery(
    "INSERT INTO users (email, password) VALUES ($1, $2);",
    email,
    passwordHash
  );
};

const findUserByEmail = async (email) => {
  await executeQuery(
    "SELECT * FROM users WHERE email=$1;",
    email
  )
}

export { addUser, findUserByEmail };

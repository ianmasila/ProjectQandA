import { executeQuery } from "../database/database.js";

const findUserByEmail = async (email) => {
  console.log("finding user by email...");
  const result = await executeQuery(
    "SELECT * FROM users WHERE email=$1;",
    email,
  );
  console.log(result.rows);
  return result.rows;
};

const isAdmin = async (email) => {
  const result = await executeQuery(
    "SELECT admin FROM users WHERE email=$1;",
    { email: email },
  );

  return result.rows;
};

export { findUserByEmail, isAdmin };

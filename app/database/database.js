import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;

let connectionPool;
if (Deno.env.get("DATABASE_URL")) {
  console.log("established database server.")
  // Get database configuration details from Postgres database server
  connectionPool = new Pool(Deno.env.get("DATABASE_URL"), CONCURRENT_CONNECTIONS);
} else {
  // Get database configuration details from the environment
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, ...args) => {
  // ...args represents a variable number of arguments
  // args is an array 
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    console.log("connected to database client.");
    const result = await client.queryObject(query, args);
    console.log("database client queried.");
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };

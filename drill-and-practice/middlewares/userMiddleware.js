// Every request to the server queries the database for user data and adds the UP TO DATE user details to the context
import * as userService from "../services/userService.js";

const userMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (user) {
    const userFromDatabase = await userService.findUserByEmail(user.email);
    context.user = userFromDatabase[0];
  }
  await next();
};

export { userMiddleware };

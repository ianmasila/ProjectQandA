import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const data = {
  loginPage: true,
  email: "",
};

const getData = async (request) => {
  const data = {
    email: "",
    password: "",
  };

  if (request) {
    const body = request.body({ type: "form" });
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
  }

  return data;
};

const showLoginForm = ({ render }) => {
  data.errors = null;
  render("loginPage.eta", data);
};

const authenticateUser = async ({ request, response, state, render }) => {
  console.log("authenticating user...");
  const formData = await getData(request);
  const userFromDatabase = (await userService.findUserByEmail(formData.email));
  if (userFromDatabase.length !== 1) {
    console.log("no such user.");
    data.errors = { emailOrPassword: { isValid: "Invalid email or password!" } };
    render("loginPage.eta", data);
    return;
  } 
  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(formData.password, user.password);
  if (!passwordMatches) {
    console.log("wrong password.");
    data.errors = { emailOrPassword: { isValid: "Invalid email or password! Please try again!" } };
    render("loginPage.eta", data)
    return;
  }
  await state.session.set("user", user);
  response.redirect("/topics");
};

export { authenticateUser, showLoginForm };

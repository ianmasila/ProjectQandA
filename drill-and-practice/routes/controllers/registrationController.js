import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";
import * as registrationService from "../../services/registrationService.js";

const data = {
  registrationPage: true,
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

const showRegistrationForm = ({ render }) => {
  data.errors = null;
  render("registrationPage.eta", data);
};

const registerUser = async ({ request, response, render }) => {
  const formData = await getData(request);
  const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
  };
  const [passes, errors] = await validasaur.validate(formData, validationRules);

  if (passes) {
    const passwordHash = await bcrypt.hash(formData.password);
    await registrationService.addUser(formData.email, passwordHash);
    response.redirect("/auth/login");
  } else {
    data.email = formData.email;
    data.errors = errors;
    render("registrationPage.eta", data);
  }
};

export { registerUser, showRegistrationForm };

import { validasaur } from "../../deps.js";
import * as topicsService from "../../services/topicsService.js";
import * as userService from "../../services/userService.js";

const data = {
    topicsPage: true,
    name: "",
    topics: [],
    errors: null
}

const getData = async (request) => {
  const data = {
    name: "",
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
  }

  return data;
};

const createTopic = async ({ request, response, render, user }) => {
  const isAdmin = user.admin;
  if (isAdmin) {
    const formData = await getData(request);
    const validationRules = {
      name: [validasaur.required],
    };
    const [passes, errors] = await validasaur.validate(formData, validationRules);

    if (passes) {
      await topicsService.createTopic(formData.name, user.id);
      data.errors = null;
      response.redirect("/topics");
    } else {
      data.name = formData.name;
      data.errors = errors;
      render("topicsPage.eta", data);
    }
  } else {
    render("topicsPage.eta", data);
  }
};

const deleteTopic = async ({ response, params, render, user }) => {
  const isAdmin = (await userService.isAdmin(user.email))[0].admin;
  if (isAdmin) {
    const id = params.id;
    await topicsService.deleteTopic(id);
    response.redirect("/topics");
  }
  else {
    render("topicsPage.eta", data);
  }
};

const listTopics = async ({ render }) => {
    data.topics = await topicsService.getTopics();
    render("topicsPage.eta", data)
};

export { createTopic, deleteTopic, listTopics };

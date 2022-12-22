import { validasaur } from "../../deps.js";
import * as topicsService from "../../services/topicsService.js";

const data = {
    singleTopicPage: true,
    topicId: "",
    questionText: "",
    topicQuestions: [],
    errors: null,
};

const getData = async (request) => {
  const data = {
    questionText: "",
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.questionText = params.get("question_text");
  }

  return data;
};

const createQuestion = async ({ request, response, render, params, user }) => {
  const topicId = params.id;
  data.topicId = topicId;
  const formData = await getData(request);
  const validationRules = {
    questionText: [validasaur.required],
  };
  const [passes, errors] = await validasaur.validate(formData, validationRules);

  if (passes) {
    await topicsService.createQuestion(user.id, topicId, formData.questionText);
    data.errors = null;
    response.redirect(`/topics/${topicId}`);
  } else {
    data.questionText = formData.questionText;
    data.errors = errors;
    render("singleTopicPage.eta", data);
  }
};

const listQuestions = async ({ render, params }) => {
    const topicId = params.id;
    data.topicId = topicId;
    data.topicQuestions = await topicsService.getTopicQuestions(topicId);
    render("singleTopicPage.eta", data)
};

export { createQuestion, listQuestions };

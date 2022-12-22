import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";

const data = {
  singleQuestionPage: true,
  question: {},
  options: [],
  optionText: "",
};

const getData = async (request) => {
  const data = {
    optionText: "",
    isCorrect: false,
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.optionText = params.get("option_text");
    data.isCorrect = params.has("is_correct");
  }

  return data;
};

const showQuestionAndOptions = async ({ render, params }) => {
  data.errors = null;   // clean any lingering errors
  const questionId = params.qId;
  data.question = (await questionsService.getQuestion(questionId))[0];
  data.options = await questionsService.getOptions(questionId);
  console.log("single question data", data);
  render("singleQuestionPage.eta", data);
};

const createOption = async ({ request, response, render, params }) => {
  const topicId = params.id;
  const questionId = params.qId;
  const formData = await getData(request);
  const validationRules = {
    optionText: [validasaur.required],
  };
  const [passes, errors] = await validasaur.validate(formData, validationRules);

  if (passes) {
    await questionsService.createOption(questionId, formData.optionText, formData.isCorrect);
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
  } else {
    data.optionText = formData.optionText;
    data.errors = errors;
    render("singleQuestionPage.eta", data);
  }
};

const deleteOption = async ({ request, response, render, params }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const optionId = params.oId;
  await questionsService.deleteOption(optionId);
  response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

const deleteQuestion = async ({ request, response, render, params }) => {
  const topicId = params.tId;
  const questionId = params.qId;
  await questionsService.deleteQuestion(questionId);
  response.redirect(`/topics/${topicId}`);
};

export { showQuestionAndOptions, createOption, deleteOption, deleteQuestion };

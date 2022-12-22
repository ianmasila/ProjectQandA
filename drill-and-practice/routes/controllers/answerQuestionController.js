import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";
import * as answersService from "../../services/answersService.js";

const data = {
    answerQuestionPage: true,
    question: {},
    options: [],
};

const showQuestionAndOptions = async ({ request, response, render, params }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    data.question = (await questionsService.getQuestion(questionId))[0];
    data.options = await questionsService.getOptions(questionId);
    render("answerQuestionPage.eta", data);
};

const chooseOption = async ({ request, response, render, params, user }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    const optionId = params.oId;
    await answersService.createAnswer(user.id, questionId, optionId);
    const isCorrect = (await answersService.isCorrect(optionId))[0].isCorrect;
    if (isCorrect) {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
    } else {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
    }
};

export { showQuestionAndOptions, chooseOption };

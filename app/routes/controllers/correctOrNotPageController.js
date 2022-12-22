import * as answersService from "../../services/answersService.js";

const data = {
  correctOrNotPage: true,
  isCorrect: true,
  correctOption: {},
  topicId: ""
};

const showCorrectOrNotPage = async ({ request, render }) => {
    const pathnameParts = request.url.pathname.split('/');
    data.isCorrect = pathnameParts[5] === "correct";
    data.topicId = pathnameParts[2];
    if (!data.isCorrect) {
        const questionId = pathnameParts[4];
        data.correctOption = (await answersService.findCorrectOption(questionId))[0];
    }

    render("correctOrNotPage.eta", data);
}

export { showCorrectOrNotPage };

import * as randomQuestionApiService from "../../services/randomQuestionApiService.js";
import * as answersService from "../../services/answersService.js";

const getRandomQuestion = async ({ response }) => {
    //   const newObject = JSON.parse(JSON.stringify(oldObject));
    //   newObject["questionId"] = newObject["questionid"];            
    //   newObject["questionText"] = newObject["questiontext"];
    //   newObject["answerOptions"] = newObject["answeroptions"];   
    // const oldAnswerOptions = randomQuestion["answerOptions"][0]
    // Object.assign(oldAnswerOptions, {  optionId: oldAnswerOptions["optionid"],
    //                                     optionText: oldAnswerOptions["optiontext"] })
    // Object.assign(randomQuestion, { questionId: randomQuestion["questionid"],
    //                                 questionText: randomQuestion["questiontext"],
    //                                 optionId: randomQuestion["answerOptions"][0].option })
    // const { questionid, questiontext, ...rest } = randomQuestion;
    // response.body = rest;
    const randomQuestion = await randomQuestionApiService.getRandomQuestion();
    if (randomQuestion && randomQuestion.length > 0) {
        const options = await randomQuestionApiService.getApiOptions(randomQuestion[0].questionId);
        const result = Object.assign(randomQuestion[0], { answerOptions: options });
        response.body = result;
    }
    else {
        response.body = {};
    }
};

const isCorrect = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    const questionId = document.questionId;
    const optionId = document.optionId;
    const isCorrect = (await answersService.isCorrect(optionId))[0].isCorrect;

    response.body = { correct: isCorrect };
}

export { getRandomQuestion, isCorrect }
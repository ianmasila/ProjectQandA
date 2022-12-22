import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as singleTopicController from "./controllers/singleTopicController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizzesController from "./controllers/quizzesController.js";
import * as answerQuestionController from "./controllers/answerQuestionController.js";
import * as correctOrNotPageController from "./controllers/correctOrNotPageController.js";
import * as randomQuestionApi from "./apis/randomQuestionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.createTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);
router.get("/topics/:id", singleTopicController.listQuestions);

router.post("/topics/:id/questions", singleTopicController.createQuestion);
router.get("/topics/:id/questions/:qId", questionsController.showQuestionAndOptions);
router.post("/topics/:tId/questions/:qId/delete", questionsController.deleteQuestion);

router.post("/topics/:id/questions/:qId/options", questionsController.createOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionsController.deleteOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.authenticateUser);

router.get("/quiz", quizzesController.listTopics);
router.get("/quiz/:tId", quizzesController.getRandomQuestion);

router.get("/quiz/:tId/questions/:qId", answerQuestionController.showQuestionAndOptions);
router.post("/quiz/:tId/questions/:qId/options/:oId", answerQuestionController.chooseOption);

router.get("/quiz/:tId/questions/:qId/correct", correctOrNotPageController.showCorrectOrNotPage);
router.get("/quiz/:tId/questions/:qId/incorrect", correctOrNotPageController.showCorrectOrNotPage);

router.get("/api/questions/random", randomQuestionApi.getRandomQuestion);
router.post("/api/questions/answer", randomQuestionApi.isCorrect);

export { router };

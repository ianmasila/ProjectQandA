import * as statisticsService from "../../services/statisticsService.js";

const data = {
  mainPage: true,
  topicsCount: 0,
  questionsCount: 0,
  questionAnswersCount: 0,
};

const showMain = async ({ render }) => {
  const allCounts = (await statisticsService.getAllCounts())[0];
  data.topicsCount = allCounts.topicsCount;
  data.questionsCount = allCounts.questionsCount;
  data.questionAnswersCount = allCounts.questionAnswersCount;

  render("main.eta", data);
};

export { showMain };

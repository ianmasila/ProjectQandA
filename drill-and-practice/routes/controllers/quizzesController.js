import * as topicsService from "../../services/topicsService.js";

const data = {
  quizzesPage: true,
  topics: [],
  noQuestionFoundMessages: [],
  questionlessTopics: []
};

const listTopics = async ({ render }) => {
  data.topics = await topicsService.getTopics();
  data.errors = null;
  render("quizzesPage.eta", data);
};

const getRandomQuestion = async ({ response, render, params }) => {
  const topicId = params.tId;
  const topicName = (await topicsService.getTopicNameById(topicId))[0].name;
  const randomQuestionList = (await topicsService.getRandomQuestion(topicId));
  if (randomQuestionList && randomQuestionList.length > 0) {
    data.questionlessTopics = data.questionlessTopics.filter((topic) => topic !== topicName)
    data.noQuestionFoundMessages = data.questionlessTopics.map((topic) => `There are no questions for topic "${topic}" yet.`);
    response.redirect(`/quiz/${topicId}/questions/${randomQuestionList[0].id}`);
  } else {
    data.questionlessTopics = [... new Set(data.questionlessTopics.concat([topicName]))]
    data.noQuestionFoundMessages = data.questionlessTopics.map((topic) => `There are no questions for topic "${topic}" yet.`);
    render("quizzesPage.eta", data);
  }
};

export { listTopics, getRandomQuestion };

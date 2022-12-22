import { assertEquals, superoak } from "../deps.js";
import { app } from "../app.js";
import * as topicsController from "../routes/controllers/topicsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

Deno.test(`GET to /api/questions/random returns a json document`, async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/questions/random")
    .expect(200)
    .expect("Content-Type", new RegExp("application/json"))
});

Deno.test(`POST to /api/questions/answer with a correct answer returns { correct: true }`, async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/questions/answer")
    .send({
      "questionId": 1,
      "optionId": 1,
    })
    .expect(200)
    .expect("Content-Type", new RegExp("application/json"))
    .expect({ correct: true });
});

Deno.test(`POST to /api/questions/answer with an incorrect answer returns { correct: false }`, async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/questions/answer")
    .send({
      "questionId": 1,
      "optionId": 2,
    })
    .expect(200)
    .expect("Content-Type", new RegExp("application/json"))
    .expect({ correct: false });
});

Deno.test(`GET to / returns a document of media type "text/html"`, async () => {
  const testClient = await superoak(app);
  await testClient.get("/")
    .expect(200)
    .expect("Content-Type", new RegExp("text/html"));
});

// Mocking controllers and middlewares

// Main page controller renders "main.eta"
Deno.test(`GET to / renders "main.eta"`, () => {
  let usedParameterValues = null;

  const myRenderFunction = (...args) => {
    usedParameterValues = args;
  };

  const myContext = {
    render: myRenderFunction,
  };

  showMain(myContext); //

  assertEquals(usedParameterValues[0], "main.eta");
});

// Unauthenticated users are redirected to login page when accessing /topics path
Deno.test(`GET to /topics by unauthenticated users redirects to login page`, () => {
  let usedPath = null;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    // user: {id: 2, email: 'nai@notadmin.com', password: '$2a$12$Rak6Y.JwgaMm5DdbjoasuO/ytCJs5gB5buaJDMlDZeAHwwfi9ZhrC', admin: false},
  };

  const makeRedirection = (path) => {
    usedPath = path;
  };

  const next = () => {};

  authMiddleware(myContext, next);

  assertEquals(usedPath, "/auth/login");
});

// Authenticated users have access to /topics path
Deno.test(`GET to /topics by authenticated users is allowed`, () => {
  let isAllowed = null;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    user: {
      id: 2,
      email: "nai@notadmin.com",
      password: "$2a$12$Rak6Y.JwgaMm5DdbjoasuO/ytCJs5gB5buaJDMlDZeAHwwfi9ZhrC",
      admin: false,
    },
  };

  const makeRedirection = (path) => {
    usedPath = path;
  };

  const next = () => {
    isAllowed = true;
  };

  authMiddleware(myContext, next);

  assertEquals(isAllowed, true);
});

// Admin users can create topics
Deno.test(`POST to /topics by admin users creates a topic`, () => {
  let topicCreated = false;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    user: {
      id: 1,
      email: "admin@admin.com",
      password: "$2a$10$IML8QCf6xA.alRbW.CG5PuvYc3Qs94vJvoTwbsSehs8s515cUMuZa",
      admin: true,
    },
  };

  const makeRedirection = (path) => {
    if (path === "/topics") {
      topicCreated = true;
    }
  };

  topicsController.createTopic(myContext);

  assertEquals(topicCreated, true);
});

// Non-admin users cannot create topics
Deno.test(`POST to /topics by non-admin users does not create a topic`, () => {
  let topicCreated = false;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    user: {
      id: 2,
      email: "nai@notadmin.com",
      password: "$2a$12$Rak6Y.JwgaMm5DdbjoasuO/ytCJs5gB5buaJDMlDZeAHwwfi9ZhrC",
      admin: false,
    },
  };

  const makeRedirection = (path) => {
    if (path === "/topics") {
      topicCreated = true;
    }
  };

  topicsController.createTopic(myContext);

  assertEquals(topicCreated, false);
});

// Admin users can delete topics
Deno.test(`POST to /topics/:id/delete by admin users deletes a topic`, () => {
  let topicDeleted = false;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    user: {
      id: 1,
      email: "admin@admin.com",
      password: "$2a$10$IML8QCf6xA.alRbW.CG5PuvYc3Qs94vJvoTwbsSehs8s515cUMuZa",
      admin: true,
    },
  };

  const makeRedirection = (path) => {
    if (path === "/topics") {
      topicDeleted = true;
    }
  };

  topicsController.deleteTopic(myContext);

  assertEquals(topicDeleted, true);
});

// Non-admin users cannot delete topics
Deno.test(`POST to /topics/:id/delete by non-admin users does not delete a topic`, () => {
  let topicDeleted = false;

  const myContext = {
    render: null,
    request: null,
    response: {
      redirect: makeRedirection,
    },
    user: {
      id: 2,
      email: "nai@notadmin.com",
      password: "$2a$12$Rak6Y.JwgaMm5DdbjoasuO/ytCJs5gB5buaJDMlDZeAHwwfi9ZhrC",
      admin: false,
    },
  };

  const makeRedirection = (path) => {
    if (path === "/topics") {
      topicDeleted = true;
    }
  };

  topicsController.deleteTopic(myContext);

  assertEquals(topicDeleted, false);
});

// Deno.test(`GET to /topics by an unauthenticated user returns a 303 "See other" response`, async () => {
//   const testClient = await superoak(app);
//   const response = await testClient.get("/topics");
//   const sessionCookie = response.headers["set-cookie"];
//   assertMatch(sessionCookie, new RegExp("sid"));
// })

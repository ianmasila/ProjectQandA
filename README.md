# Project II: *Project Q&A*

### Name of application

*Project Q&A*

### Description 

*Project Q&A* is an application where you can test your knowledge on certain topics. Anyone using the application can answer random questions from random topics via Project Q&A's API.

Moreover, users who have logged into their *Project Q&A* accounts have access to all available topics and their respective questions. They may also add questions and answer options to any topic.

Furthermore, authenticated users may quiz themselves by answering random questions on any available topic and getting immediate feedback. 

<!-- ### Testing

*Project Q&A* offers automated tests under the path "app/tests/app_test.js". These tests validate responses to some of the HTTP requests that can be made to the application. Here is a list of tests offered: 

+ GET to /api/questions/random returns a json document
+ POST to /api/questions/answer with a correct answer returns { correct: true }
+ POST to /api/questions/answer with an incorrect answer returns { correct: false }
+ GET to / returns a document of media type "text/html"
+ GET to / renders "main.eta"
+ GET to /topics by unauthenticated users redirects to login page
+ GET to /topics by authenticated users is allowed
+ POST to /topics by admin users creates a topic
+ POST to /topics by non-admin users does not create a topic
+ POST to /topics/:id/delete by admin users deletes a topic
+ POST to /topics/:id/delete by non-admin users does not delete a topic -->

### Location of application 

~~Users may access, use, and test *Project Q&A* here: <https://projectqanda.herokuapp.com>.~~ 

(*Project Q&A* is no longer being hosted on _Heroku_).

### Guidelines for running the application locally 

#### ARM Architectures
Deno images are only available for Intel/AMD architectures. There are no official Docker images for Deno for ARM-based architectures such as Apple Silicon yet. See <https://hub.docker.com/r/denoland/deno> for more information. Since this project relies on official Deno Docker images, we unfortunately cannot run *Project Q&A* locally on the Macbook M1 nor M2 chip.

Nonetheless, an alternative would be to run a Linux virtual machine on your Macbook to be able to run *Project Q&A* locally as shown below.

<!-- If interested, see <https://github.com/LukeChannings/deno-arm64> for a workaround Deno Docker image for ARM64.  -->

#### Intel/AMD Architectures

To run *Project Q&A* locally, follow the following instructions:

1. Open a terminal in the project zip file's directory and run `docker-compose up`.
2. Run `docker ps` to confirm that the project's "app", "database-server", and "flyway" containers are running.
3. Open a browser window and access *Project Q&A* at <http://localhost:7777>. Alternatively, curl the application on the terminal. For instance, run `curl http://localhost:7777/` to get *Project Q&A*'s main page. 
4. To shut down the application, run `docker-compose stop` or CTRL-C.
5. Merry quizzing!
   
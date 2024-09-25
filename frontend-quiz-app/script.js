"use strict";

const bodyEl = document.getElementById("body");
const themeToggleBtn = document.getElementById("theme-toggle");
const topicsEl = document.getElementById("topics");
const topicEl = document.getElementById("topic");
const welcomePage = document.getElementById("welcome-page");
const questionPage = document.getElementById("question-page");
const questionProgressEl = document.getElementById("question-progress");
const questionsEl = document.getElementById("questions");
const optionEls = document.querySelectorAll(".btn--option");
const questionEl = document.getElementById("question");
const submitAnswerBtn = document.getElementById("submit-answer");
const errorMessageEl = document.getElementById("error-message");
const nextQuestionBtn = document.getElementById("next-question");
const completeQuizBtn = document.getElementById("complete-quiz");
const progressEl = document.getElementById("progress");

let questions;
let currentQuestion = 0;
let correctAnswers = 0;

async function fetchData() {
  const request = await fetch("data.json");
  if (!request.ok) return null;
  const data = await request.json();
  return data;
}

function htmlEncode(string) {
  const el = document.createElement("div");
  el.innerText = el.textContent = string;
  const encoded = el.innerHTML;
  return encoded;
}

const toggleTheme = function () {
  bodyEl.classList.toggle("dark");
};

const populateQuestionsPage = function () {
  const question = questions[currentQuestion];

  // show the question progress
  questionProgressEl.innerHTML = `Question ${currentQuestion + 1} of ${
    questions.length
  }`;

  progressEl.style.width = `${(currentQuestion / questions.length) * 100}%`;

  // set the question
  questionEl.innerHTML = htmlEncode(question.question);

  // set the options
  for (let i = 0; i < question.options.length; i++) {
    document.getElementById(`option-${i}`).innerText = question.options[i];
  }
};

const askTopicQuestions = async function (event) {
  const btn = event.target.closest(".btn");

  if (!btn) return;

  topicEl.innerHTML = btn.innerHTML;

  // transition from welcome page to question page
  welcomePage.classList.toggle("hidden");
  questionPage.classList.toggle("hidden");

  // get quiz data
  const data = await fetchData();
  questions = data["quizzes"].find((quiz) => quiz.title === btn.dataset.topic)[
    "questions"
  ];

  populateQuestionsPage();
};

const selectQuestion = function (event) {
  const btn = event.target.closest(".btn--option");

  if (!btn) return;

  errorMessageEl.classList.add("hidden");

  // change the state of the option that was clicked to selected, and other options to unselected
  for (const option of optionEls) {
    option.dataset.selected = option === btn;
  }
};

const submitAnswer = function () {
  // if no option has been selected show the error message
  if (!document.querySelector('.btn--option[data-selected="true"')) {
    errorMessageEl.classList.remove("hidden");
    return;
  }

  const answer = questions[currentQuestion]["answer"];

  for (const option of optionEls) {
    const optionText = option.querySelector(".option-text").innerText;

    // show which answer was the correct one
    if (optionText === answer) {
      option.classList.add("option-status--answer");
    }

    // highlight whether the selected answer was right or wrong
    if (option.dataset.selected === "true") {
      option.classList.add(
        optionText === answer ? "option-status--right" : "option-status--wrong"
      );
    }

    // increment the amount of correct answers submitted
    if (optionText === answer && option.dataset.selected === "true") {
      correctAnswers++;
    }
  }

  // show the next question or complete quiz button
  if (currentQuestion + 1 >= questions.length) {
    submitAnswerBtn.classList.add("hidden");
    completeQuizBtn.classList.remove("hidden");
  } else {
    submitAnswerBtn.classList.add("hidden");
    nextQuestionBtn.classList.remove("hidden");
  }
};

const nextQuestion = function () {
  // reset options
  for (const option of optionEls) {
    option.classList.remove("option-status--answer");
    option.classList.remove("option-status--right");
    option.classList.remove("option-status--wrong");
    option.dataset.selected = "false";
  }

  // increment current question
  currentQuestion++;

  populateQuestionsPage();

  nextQuestionBtn.classList.add("hidden");
  submitAnswerBtn.classList.remove("hidden");
};

const completeQuiz = function () {
  questionPage.classList.add("hidden");
  // TODO show final page
};

// event listeners
themeToggleBtn.addEventListener("change", toggleTheme);
topicsEl.addEventListener("click", askTopicQuestions);
questionsEl.addEventListener("click", selectQuestion);
submitAnswerBtn.addEventListener("click", submitAnswer);
nextQuestionBtn.addEventListener("click", nextQuestion);
completeQuizBtn.addEventListener("click", completeQuiz);

// if the user prefers dark theme, apply it
if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
  themeToggleBtn.checked = true;
  toggleTheme();
}

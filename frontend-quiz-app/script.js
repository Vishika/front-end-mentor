"use strict";

const bodyEl = document.getElementById("body");
const themeToggleBtn = document.getElementById("theme-toggle");
const topicsEl = document.getElementById("topics");
const topicEl = document.getElementById("topic");
const welcomePage = document.getElementById("welcome-page");
const questionPage = document.getElementById("question-page");
const questionProgressEl = document.getElementById("question-progress");
const questionEl = document.getElementById("question");
let questions;
let currentQuestion = 0;
let correctAnswers = 0;

const toggleTheme = function () {
  bodyEl.classList.toggle("dark");
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

  const question = questions[currentQuestion];

  // show the question progress
  questionProgressEl.innerHTML = `Question 1 of ${questions.length}`;

  // set the question
  questionEl.innerHTML = question.question;

  // set the options
  for (let i = 0; i < question.options.length; i++) {
    document.getElementById(`option-${i}`).innerText = question.options[i];
  }
};

async function fetchData() {
  const request = await fetch("data.json");
  if (!request.ok) return null;
  const data = await request.json();
  return data;
}

themeToggleBtn.addEventListener("change", toggleTheme);
topicsEl.addEventListener("click", askTopicQuestions);

// if the user prefers dark theme, apply it
if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
  themeToggleBtn.checked = true;
  toggleTheme();
}

"use strict";

const ratingContainer = document.querySelector(".rating-container");
const thankYouContainer = document.querySelector(".thank-you-container");
const thankYouRating = document.querySelector(".thank-you-rating");
const form = document.querySelector("form");
const ratingsContainer = document.querySelector(".ratings");
const ratingOptions = document.querySelectorAll(".rating");

const submit = function (event) {
  event.preventDefault();

  const ratingValue = document.querySelector(".rating[aria-checked='true']");

  if (!ratingValue) return;

  ratingContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
  thankYouRating.innerHTML = ratingValue.dataset.rating;
};

const checkRating = function (rating) {
  for (const option of ratingOptions) {
    option.setAttribute("aria-checked", `${option === rating}`);

    if (option === rating) {
      option.focus();
    }
  }
};

const checkPreviousRating = function (rating) {
  const target =
    document.querySelector(".rating[aria-checked='true']") || rating;
  const index = Array.from(ratingOptions).indexOf(target);

  if (index === 0) {
    checkRating(ratingOptions[ratingOptions.length - 1]);
  } else {
    checkRating(ratingOptions[index - 1]);
  }
};

const checkNextRating = function (rating) {
  const target =
    document.querySelector(".rating[aria-checked='true']") || rating;
  const index = Array.from(ratingOptions).indexOf(target);

  if (index === ratingOptions.length - 1) {
    checkRating(ratingOptions[0]);
  } else {
    checkRating(ratingOptions[index + 1]);
  }
};

const ratingClicked = function (event) {
  const rating = event.target.closest(".rating");

  if (!rating) return;

  checkRating(rating);
};

const ratingPress = function (event) {
  const rating = event.target.closest(".rating");

  if (!rating) return;

  switch (event.key) {
    case " ":
      checkRating(rating);
      break;
    case "Up":
    case "ArrowUp":
    case "Left":
    case "ArrowLeft":
      checkPreviousRating(rating);
      break;

    case "Down":
    case "ArrowDown":
    case "Right":
    case "ArrowRight":
      checkNextRating(rating);
      break;
    case "Enter":
      submit(event);
      break;
    default:
      break;
  }
};

ratingsContainer.addEventListener("click", ratingClicked);
ratingContainer.addEventListener("keydown", ratingPress);
form.addEventListener("submit", submit);

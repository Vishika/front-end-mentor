"use strict";

const ratingContainer = document.querySelector(".rating-container");
const thankYouContainer = document.querySelector(".thank-you-container");
const thankYouRating = document.querySelector(".thank-you-rating");
const form = document.querySelector("form");

const submit = function (event) {
  event.preventDefault();
  ratingContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
  const data = new FormData(event.target);
  const values = Object.fromEntries(data);
  thankYouRating.innerHTML = values.rating;
};

form.addEventListener("submit", submit);

"use strict";

const successScreen = document.getElementById("success");
const signupScreen = document.getElementById("signup");
const successBtn = document.getElementById("btn--success");
const signupForm = document.getElementById("signup-form");
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("email");
const emailConfirmation = document.getElementById("email-confirmation");

const signup = function (event) {
  event.preventDefault();
  emailError.textContent = "";
  emailInput.classList.remove("error");
  const { email } = Object.fromEntries(new FormData(event.target));
  if (emailInput.value && emailInput.validity.valid) {
    emailConfirmation.textContent = emailInput.value;
    signupScreen.classList.toggle("hidden");
    successScreen.classList.toggle("hidden");
    emailInput.value = "";
  } else {
    emailError.textContent = "Valid email required";
    emailInput.classList.add("error");
  }
};

const dismiss = function (event) {
  event.preventDefault();
  successScreen.classList.toggle("hidden");
  signupScreen.classList.toggle("hidden");
  emailConfirmation.textContent = "";
};

signupForm.addEventListener("submit", signup);
successBtn.addEventListener("click", dismiss);

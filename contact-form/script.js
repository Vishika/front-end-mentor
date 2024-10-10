"use strict";

const form = document.getElementById("contact-form");
const modal = document.getElementById("modal");

const inputNames = [
  "first_name",
  "last_name",
  "email",
  "query_type",
  "message",
  "consent",
];

const resetErrorClasses = function () {
  const errors = document.querySelectorAll(".error");
  for (const error of errors) {
    error.classList.remove("error");
  }
};

const resetErrorMessages = function () {
  for (const inputName of inputNames) {
    const errorEl = document.getElementById(`error-${inputName}`);
    errorEl.innerText = "";
  }
};

const resetValidation = function () {
  resetErrorMessages();
  resetErrorClasses();
};

const validateInputs = function (data) {
  let valid = true;
  for (const inputName of inputNames) {
    const value = data[inputName];
    const errorEl = document.getElementById(`error-${inputName}`);
    if (value === undefined || value === "") {
      valid = false;
      if (inputName === "consent") {
        errorEl.innerText =
          "To submit this form, please consent to being contacted";
      } else if (inputName === "query_type") {
        errorEl.innerText = "Please select a query type";
      } else {
        errorEl.innerText = "This field is required";
        errorEl.closest(".field").classList.add("error");
      }
    } else if (inputName === "email") {
      const inputElement = document.getElementById(inputName);
      if (!inputElement.checkValidity()) {
        valid = false;
        errorEl.innerText = "Please enter a valid email address";
        errorEl.closest(".field").classList.add("error");
      }
    }
  }
  return valid;
};

const getFormData = function (event) {
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  return data;
};

const handleSubmission = function (event) {
  event.preventDefault();
  const data = getFormData(event);
  resetValidation();
  const valid = validateInputs(data);

  if (valid) {
    console.log(data);
    modal.show();
  }
};

form.addEventListener("submit", handleSubmission);

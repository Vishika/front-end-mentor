"use strict";

const sliderEl = document.getElementById("input-length");
const outputLengthEl = document.getElementById("output-length");
const formEl = document.getElementById("generator-form");
const generateBtn = document.getElementById("btn-generate");
const passwordEl = document.getElementById("password");
const strengthVisualEl = document.getElementById("output-strength-visual");
const strengthStringEl = document.getElementById("output-strength-string");
const copyBtn = document.getElementById("btn-copy");
const copyStateEl = document.getElementById("copy-state");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numericChars = "0123456789";
const symbolChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const updateSliderProgress = function () {
  const value = (sliderEl.value / sliderEl.max) * 100;
  outputLengthEl.textContent = sliderEl.value;
  sliderEl.style.background = `linear-gradient(to right, #a4ffaf ${value}%, #18171f ${value}%)`;
};

const randomNum = function (max) {
  return Math.trunc(Math.random() * max);
};

const sanitizeCharsForHTML = function (characters) {
  let sanitized = "";
  for (let char of characters) {
    if (char === "&") {
      sanitized += "&amp";
    } else if (char === "<") {
      sanitized += "&lt";
    } else if (char === ">") {
      sanitized += "&gt";
    } else {
      sanitized += char;
    }
  }
  return sanitized;
};

const generatePassword = function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const passwordLength = +data["input-length"];
  let characters = "";
  let password = "";
  let strengthInt = 0;
  let strengthStr = "";

  if (data["uppercase"]) {
    characters += uppercaseChars;
    strengthInt++;
  }
  if (data["lowercase"]) {
    characters += lowercaseChars;
    strengthInt++;
  }
  if (data["numbers"]) {
    characters += numericChars;
    strengthInt++;
  }
  if (data["symbols"]) {
    characters += symbolChars;
    strengthInt++;
  }

  if (characters.length === 0) return;

  // this heuristic modifies the password strength based on how long the password is
  if (passwordLength < 10) {
    strengthInt = Math.ceil(strengthInt * (passwordLength / 10));
  }

  if (strengthInt == 4) {
    strengthStr = "strong";
  } else if (strengthInt == 3) {
    strengthStr = "medium";
  } else if (strengthInt == 2) {
    strengthStr = "weak";
  } else {
    strengthStr = "too weak!";
  }

  while (password.length < passwordLength) {
    password += characters[randomNum(characters.length)];
  }

  copyStateEl.textContent = "";
  passwordEl.textContent = password;
  passwordEl.classList.remove("default");

  strengthStringEl.textContent = strengthStr;
  strengthVisualEl.className = `strength-${strengthInt}`;
};

const copyPassword = async function () {
  if (passwordEl.classList.contains("default")) return;

  navigator.clipboard.writeText(passwordEl.textContent);
  copyStateEl.textContent = "copied";
};

sliderEl.addEventListener("input", updateSliderProgress);
copyBtn.addEventListener("click", copyPassword);
formEl.addEventListener("submit", generatePassword);

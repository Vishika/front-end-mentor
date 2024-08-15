"use strict";

const billInput = document.getElementById("bill");
const tipOptions = document.getElementById("tip-options");
const tipCustomInput = document.getElementById("tip-custom");
const peopleInput = document.getElementById("people");
const billError = document.getElementById("bill-error");
const tipError = document.getElementById("tip-error");
const peopleError = document.getElementById("people-error");
const tipOutput = document.getElementById("output-tip");
const totalOutput = document.getElementById("output-total");
const resetBtn = document.getElementById("reset");

const calculate = function () {
  // get input
  const billAmount = getBill();
  const tipPercentage = getTip();
  const numPeople = getNumPeople();

  // validate input and update error message
  validateNum(billAmount, billError, false, 0.01);
  validateNum(tipPercentage, tipError, true, 0);
  validateNum(numPeople, peopleError, true, 1);

  // perform calculations
  const tipAmount = billAmount * (tipPercentage / 100);
  const tipPerPerson = tipAmount / numPeople;

  // output
  tipOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalOutput.textContent = `$${(tipAmount + billAmount).toFixed(2)}`;

  // activate reset button
  resetBtn.classList.remove("inactive");
};

const selectTip = function (event) {
  // exit if no something like white space is accidently clicked
  if (!event.target.hasAttribute("data-selected")) return;

  // update the "selected" data attribute
  for (const tipOption of tipOptions.children) {
    tipOption.dataset.selected = event.target === tipOption;
  }

  if (event.target !== tipCustomInput) {
    tipCustomInput.value = "";
    tipError.textContent = "";
  }

  // run the calculator
  calculate();
};

const getBill = function () {
  return +billInput.value;
};

const getTip = function () {
  return +document.querySelector('[data-selected="true"]')?.dataset?.tip;
};

const getNumPeople = function () {
  return +peopleInput.value;
};

const validateNum = function (
  value,
  errorElement,
  isInteger,
  min = 0,
  max = Infinity
) {
  let message = "";
  if (isNaN(value)) message = "Must be a number";
  else if (isInteger && !Number.isInteger(value))
    message = "Must be an integer";
  else if (value < min) message = `Must be at least ${min}`;
  else if (value > max) message = `Can't be more than ${max}`;
  errorElement.textContent = message;
};

const customTipChange = function (event) {
  // update the "tip" data attribute for this input
  event.target.dataset.tip = event.target.value;

  // run the calculator
  calculate();
};

const reset = function () {
  if (resetBtn.classList.contains("inactive")) return;

  // empty inputs
  tipCustomInput.value = "";
  billInput.value = "";
  peopleInput.value = "";

  // reset error message
  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";

  // unselect all tip options
  for (const tipOption of tipOptions.children) {
    tipOption.dataset.selected = false;
  }

  // reset outputs
  tipOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";

  resetBtn.classList.add("inactive");
};

// listen to events
tipOptions.addEventListener("click", selectTip);
tipCustomInput.addEventListener("keyup", customTipChange);
billInput.addEventListener("keyup", calculate);
peopleInput.addEventListener("keyup", calculate);
resetBtn.addEventListener("click", reset);

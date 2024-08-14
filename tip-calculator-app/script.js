"use strict";

let debug = true;
const billInput = document.getElementById("bill");
const tipOptions = document.getElementById("tip-options");
const tipCustomInput = document.getElementById("tip-custom");
const peopleInput = document.getElementById("people");
const tipOutput = document.getElementById("output-tip");
const totalOutput = document.getElementById("output-total");

const calculate = function () {
  // get input
  const billAmount = +billInput.value;
  const tipPercentage = +document.querySelector('[data-selected="true"]')
    ?.dataset?.tip;
  const numPeople = +peopleInput.value;

  if (debug) {
    console.log(`billAmount = ${billAmount}`);
    console.log(`tipPercentage = ${tipPercentage}`);
    console.log(`numPeople = ${numPeople}`);
  }

  // perform calculations
  const tipAmount = billAmount * (tipPercentage / 100);
  const tipPerPerson = tipAmount / numPeople;

  // output
  tipOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalOutput.textContent = `$${(tipAmount + billAmount).toFixed(2)}`;
};

const selectTip = function (event) {
  // exit if no something like white space is accidently clicked
  if (!event.target.hasAttribute("data-selected")) return;

  // update the "selected" data attribute
  for (const tipOption of tipOptions.children)
    tipOption.dataset.selected = event.target === tipOption;

  if (debug) {
    console.log(`${event.target.classList[0]} clicked`);
  }

  // run the calculator
  calculate();
};

const customTipChange = function (event) {
  // update the "tip" data attribute for this input
  event.target.dataset.tip = event.target.value;

  if (debug) {
    console.log(`custom tip updated to = ${event.target.value}`);
  }

  // run the calculator
  calculate();
};

// listen to events
tipOptions.addEventListener("click", selectTip);
tipCustomInput.addEventListener("keyup", customTipChange);
billInput.addEventListener("keyup", calculate);
peopleInput.addEventListener("keyup", calculate);

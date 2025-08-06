"use strict";

const metricOption = document.getElementById("metric-option");
const imperialOption = document.getElementById("imperial-option");
const metricInputs = document.getElementById("metric");
const imperialInputs = document.getElementById("imperial");
const measurmentsSection = document.getElementById("measurements");
const calcForm = document.getElementById("calc-form");
const metricHeightCm = document.getElementById("metric-height-cm");
const metricWeightKg = document.getElementById("metric-weight-kg");
const imperialHeightFt = document.getElementById("imperial-height-ft");
const imperialHeightIn = document.getElementById("imperial-height-in");
const imperialWeightSt = document.getElementById("imperial-weight-st");
const imperialWeightLbs = document.getElementById("imperial-weight-lbs");
const welcomeText = document.getElementById("bmi--welcome");
const resultText = document.getElementById("bmi--result");
const bmiActual = document.getElementById("bmi-actual");
const bmiDescription = document.getElementById("bmi-description");
const bmiRange = document.getElementById("bmi-range");

const clearInputs = function () {
  const inputs = measurmentsSection.getElementsByTagName("input");

  for (const input of inputs) {
    input.value = 0;
  }
};

const changeToMetric = function () {
  if (!metricInputs.classList.contains("hidden")) return;

  clearInputs();
  imperialInputs.classList.add("hidden");
  metricInputs.classList.remove("hidden");
  resultText.classList.add("hidden");
  welcomeText.classList.remove("hidden");
};

const changeToImperial = function () {
  if (!imperialInputs.classList.contains("hidden")) return;

  clearInputs();
  metricInputs.classList.add("hidden");
  imperialInputs.classList.remove("hidden");
  resultText.classList.add("hidden");
  welcomeText.classList.remove("hidden");
};

const kilograms = function () {
  return +metricWeightKg.value;
};

const meters = function () {
  return +metricHeightCm.value / 100;
};

const getMetricBMI = function () {
  return kilograms() / Math.pow(meters(), 2);
};

const pounds = function () {
  return +imperialWeightSt.value * 14 + +imperialWeightLbs.value;
};

const inches = function () {
  return +imperialHeightFt.value * 12 + +imperialHeightIn.value;
};

const getImperialBMI = function () {
  return 703 * (pounds() / Math.pow(inches(), 2));
};

const updateBMIActual = function (bmi) {
  bmiActual.textContent = bmi;
};

const updateBMIDescription = function (bmi) {
  let description;
  if (bmi < 18.5) {
    description = "underweight";
  } else if (bmi < 24.9) {
    description = "a healthy weight";
  } else if (bmi < 29.9) {
    description = "overweight";
  } else {
    description = "obese";
  }
  bmiDescription.textContent = description;
};

const lowerHealthyKg = function () {
  return (18.5 * Math.pow(meters(), 2)).toFixed(1);
};

const higherHealthyKg = function () {
  return (24.9 * Math.pow(meters(), 2)).toFixed(1);
};

const lowerHealthyPounds = function () {
  return Math.ceil((18.5 / 703) * Math.pow(inches(), 2));
};

const lowerHealthySt = function () {
  return Math.floor(lowerHealthyPounds() / 14);
};

const lowerHealthyLbs = function () {
  return lowerHealthyPounds() % 14;
};

const higherHealthyPounds = function () {
  return Math.floor((24.9 / 703) * Math.pow(inches(), 2));
};

const higherHealthySt = function () {
  return Math.floor(higherHealthyPounds() / 14);
};

const higherHealthyLbs = function () {
  return higherHealthyPounds() % 14;
};

const updateBMIRange = function (bmi) {
  let range;
  if (metricOption.checked) {
    range = `${lowerHealthyKg()}kgs - ${higherHealthyKg()}kgs`;
  } else {
    range = `${lowerHealthySt()}st ${lowerHealthyLbs()}lbs - ${higherHealthySt()}st ${higherHealthyLbs()}lbs`;
  }
  bmiRange.textContent = range;
};

const displayBMI = function (bmi) {
  updateBMIActual(bmi);
  updateBMIDescription(bmi);
  updateBMIRange(bmi);
  welcomeText.classList.add("hidden");
  resultText.classList.remove("hidden");
};

const displayWelcome = function () {
  resultText.classList.add("hidden");
  welcomeText.classList.remove("hidden");
};

const formChanged = function () {
  let bmi;
  if (metricOption.checked) {
    bmi = getMetricBMI();
  } else {
    bmi = getImperialBMI();
  }

  if (bmi && bmi !== Infinity) {
    displayBMI(bmi.toFixed(1));
  } else displayWelcome();
};

metricOption.addEventListener("change", changeToMetric);
imperialOption.addEventListener("change", changeToImperial);
calcForm.addEventListener("input", formChanged);

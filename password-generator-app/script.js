"use strict";

const sliderEl = document.getElementById("input-length");

const updateSliderProgress = function () {
  const value = (sliderEl.value / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #a4ffaf ${value}%, #18171f ${value}%)`;
};

sliderEl.addEventListener("input", updateSliderProgress);

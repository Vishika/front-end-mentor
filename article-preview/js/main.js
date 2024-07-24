"use strict";

const shareBtn = document.getElementById("btn-share");
const sharePanel = document.getElementById("share");

const share = function (e) {
  shareBtn.classList.toggle("share-btn--alt");
  sharePanel.classList.toggle("hidden");
};

shareBtn.addEventListener("click", share);

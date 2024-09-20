"use strict";

const themeToggle = document.getElementById("theme-toggle");

const toggleTheme = function () {
  document.getElementById("body").classList.toggle("dark");
};

themeToggle.addEventListener("change", toggleTheme);

// if the user prefers dark theme, apply it
if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
  themeToggle.checked = true;
  toggleTheme();
}

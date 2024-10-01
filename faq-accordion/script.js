"use strict";

const faqs = document.querySelector(".faqs");

const toggleAccordion = function (event) {
  const faq = event.target.closest(".faq");

  if (!faq) return;

  faq.classList.toggle("open");
};

faqs.addEventListener("click", toggleAccordion);

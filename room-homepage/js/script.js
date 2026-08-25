"use strict";

const btnPrev = document.getElementById("carousel__btn--prev");
const btnNext = document.getElementById("carousel__btn--next");

const findOldIndex = (carousel) => {
  return carousel.reduce(
    (acc, slide, index) =>
      slide.classList.contains("current-slide") ? index : acc,
    0,
  );
};

const findNewIndex = (oldIndex, lastIndex, direction) => {
  return direction === "left"
    ? oldIndex === 0
      ? lastIndex
      : oldIndex - 1
    : oldIndex === lastIndex
      ? 0
      : oldIndex + 1;
};

const updateOldSlide = (carousel, index) => {
  carousel[index].classList.remove("slide-in-right");
  carousel[index].classList.remove("slide-in-left");
  setTimeout(() => {
    carousel[index].classList.remove("current-slide");
  }, 1000);
};

const updateNewSlide = (carousel, index, direction) => {
  if (direction === "left") {
    carousel[index].classList.add("current-slide");
    carousel[index].classList.add("slide-in-left");
  } else {
    carousel[index].classList.add("current-slide");
    carousel[index].classList.add("slide-in-right");
  }
};

const slideIn = (carouselName, direction) => {
  const carousel = Array.from(document.querySelectorAll(carouselName));
  const oldIndex = findOldIndex(carousel);
  const newIndex = findNewIndex(oldIndex, carousel.length - 1, direction);
  updateOldSlide(carousel, oldIndex);
  updateNewSlide(carousel, newIndex, direction);
};

const prevImg = () => {
  slideIn(".hero__img", "left");
  slideIn(".shop__card", "left");
};

const nextImg = () => {
  slideIn(".hero__img", "right");
  slideIn(".shop__card", "right");
};

btnPrev.addEventListener("click", prevImg);
btnNext.addEventListener("click", nextImg);

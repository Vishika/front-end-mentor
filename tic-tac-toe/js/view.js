const cssRoot = document.querySelector(":root");
const turnIconEl = document.getElementById("turn__icon");
const scoreXEl = document.getElementById("score-x");
const scoreTEl = document.getElementById("score-t");
const scoreOEl = document.getElementById("score-o");
const modalWinnerEl = document.getElementById("modal__winner");
const scoreXTextEl = document.getElementById("score-x-text");
const scoreOTextEl = document.getElementById("score-o-text");

export const updateBoard = function (board) {
  for (let i = 0; i < board.length; i++) {
    const square = document.getElementById(`s-${i}`);
    square.classList.remove("x");
    square.classList.remove("o");
    if (board[i]) square.classList.add(board[i]);
  }
};

const updateTurnIcon = function (token) {
  turnIconEl.classList.remove("x");
  turnIconEl.classList.remove("o");
  turnIconEl.classList.add(token);
};

const updateSquareHoverState = function (token) {
  cssRoot.style.setProperty("--turn", `url(images/icon-${token}-outline.svg)`);
};

export const updatePlayerForNextTurn = function (token) {
  updateTurnIcon(token);
  updateSquareHoverState(token);
};

export const updateEndModal = function (xHuman, xP1, oHuman, oP1, state) {
  const outcomes = document.querySelectorAll(".outcome");
  outcomes.forEach((outcome) => {
    if (outcome.id.slice(-1) !== state) {
      outcome.classList.add("hidden");
    } else {
      outcome.classList.remove("hidden");
    }
  });

  if (state === "t") {
    modalWinnerEl.classList.add("hidden");
  } else if (xHuman && oHuman) {
    modalWinnerEl.classList.remove("hidden");
    // human vs human
    if ((state === "x" && xP1) || (state === "o" && oP1)) {
      modalWinnerEl.textContent = "player 1 wins!";
    } else {
      modalWinnerEl.textContent = "player 2 wins!";
    }
  } else {
    modalWinnerEl.classList.remove("hidden");
    // human vs cpu
    if ((state === "x" && xHuman) || (state === "o" && oHuman)) {
      modalWinnerEl.textContent = "you won!";
    } else {
      modalWinnerEl.textContent = "oh no, you lost...";
    }
  }
};

export const updateScores = function (xHuman, xP1, oHuman, x, t, o) {
  scoreXEl.textContent = x;
  scoreTEl.textContent = t;
  scoreOEl.textContent = o;

  if (xHuman && oHuman) {
    // human vs human
    if (xP1) {
      scoreXTextEl.textContent = "x (p1)";
      scoreOTextEl.textContent = "o (p2)";
    } else {
      scoreXTextEl.textContent = "x (p2)";
      scoreOTextEl.textContent = "o (p1)";
    }
  } else {
    // human vs cpu
    if (xHuman) {
      scoreXTextEl.textContent = "x (you)";
      scoreOTextEl.textContent = "o (cpu)";
    } else {
      scoreXTextEl.textContent = "x (cpu)";
      scoreOTextEl.textContent = "o (you)";
    }
  }
};

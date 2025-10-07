import * as game from "./game.js";

const cssRoot = document.querySelector(":root");
const boardEl = document.getElementById("board");
const turnIconEl = document.getElementById("turn__icon");

const updateBoard = function (square) {
  square.classList.add(game.currentToken());
};

const updateTurnIcon = function () {
  turnIconEl.classList.remove("x");
  turnIconEl.classList.remove("o");
  turnIconEl.classList.add(game.currentToken());
};

const updateSquareHoverState = function () {
  cssRoot.style.setProperty(
    "--turn",
    `url(images/icon-${game.currentToken()}-outline.svg)`
  );
};

const updateForNextTurn = function () {
  updateTurnIcon();
  updateSquareHoverState();
};

const gameOver = function () {
  console.log("checking for a winner..." + game.state.status);
  console.log(game.state.board);

  if (game.state.status === "tie") {
    console.log(`The game is a tie!`);
  }
  if (game.state.status) {
    console.log(`You win ${game.state.status}!!!`);
  }

  return game.state.status === "";
};

const chooseSquare = function (square) {
  updateBoard(square);
  game.takeMove(square.id.substring(2, 3));

  if (!gameOver()) updateForNextTurn();
};

const boardClicked = function (event) {
  if (event.target.type !== "submit") return;

  const square = event.target.classList;

  if (square.contains("x") || square.contains("o")) return;

  chooseSquare(event.target);
};

boardEl.addEventListener("click", boardClicked);

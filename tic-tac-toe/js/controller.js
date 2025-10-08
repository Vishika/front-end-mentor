import * as model from "./model.js";
import * as view from "./view.js";

const boardEl = document.getElementById("board");

const gameOver = function () {
  console.log(model.state.board);

  if (model.state.status === "tie") {
    console.log(`The game is a tie!`);
  }
  if (model.state.status) {
    console.log(`You win ${model.state.status}!!!`);
  }

  return model.state.status === "";
};

const chooseSquare = function (square) {
  model.takeMove(square.id.substring(2, 3));
  view.updateBoard(model.state.board);

  if (!gameOver()) view.updatePlayerForNextTurn(model.currentToken());
};

const boardClicked = function (event) {
  if (event.target.type !== "submit") return;

  const square = event.target.classList;

  if (square.contains("x") || square.contains("o")) return;

  chooseSquare(event.target);
};

boardEl.addEventListener("click", boardClicked);

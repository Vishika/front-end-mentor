import * as model from "./model.js";
import * as view from "./view.js";

const boardEl = document.getElementById("board");
const endDi = document.getElementById("end-modal");
const resetDi = document.getElementById("reset-modal");
const resetBtn = document.getElementById("btn-reset");
const quitBtn = document.getElementById("btn-quit");
const nextBtn = document.getElementById("btn-next");
const noBtn = document.getElementById("btn-no");
const yesBtn = document.getElementById("btn-yes");

const gameOver = function () {
  return model.state.status !== "";
};

const updateView = function () {
  view.updateBoard(model.state.board);
  view.updateScores(
    model.state.x.human,
    model.state.x.p1,
    model.state.o.human,
    model.state.x.wins,
    model.state.ties,
    model.state.o.wins
  );
  view.updatePlayerForNextTurn(model.currentToken());
};

const chooseSquare = function (square) {
  model.takeMove(square.id.slice(-1));
  view.updateBoard(model.state.board);

  if (gameOver()) {
    view.updateScores(
      model.state.x.human,
      model.state.x.p1,
      model.state.o.human,
      model.state.x.wins,
      model.state.ties,
      model.state.o.wins
    );
    view.updateEndModal(
      model.state.x.human,
      model.state.x.p1,
      model.state.o.human,
      model.state.o.p1,
      model.state.status
    );
    endDi.showModal();
  } else view.updatePlayerForNextTurn(model.currentToken());
};

const boardClicked = function (event) {
  if (event.target.type !== "submit") return;

  const square = event.target.classList;

  if (square.contains("x") || square.contains("o")) return;

  chooseSquare(event.target);
};

const resetClicked = function () {
  resetDi.showModal();
};

const cancelReset = function () {
  resetDi.close();
};

const resetGame = function () {
  model.reset();
  updateView();
  resetDi.close();
};

const quitGame = function () {
  model.quit();
  updateView();
  endDi.close();
};

const nextGame = function () {
  model.next();
  updateView();
  endDi.close();
};

boardEl.addEventListener("click", boardClicked);
resetBtn.addEventListener("click", resetClicked);
quitBtn.addEventListener("click", quitGame);
nextBtn.addEventListener("click", nextGame);
noBtn.addEventListener("click", cancelReset);
yesBtn.addEventListener("click", resetGame);

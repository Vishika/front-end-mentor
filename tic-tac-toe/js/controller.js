import * as model from "./model.js";
import * as view from "./view.js";

const boardEl = document.getElementById("board");
const menuEl = document.getElementById("menu");
const gameEl = document.getElementById("game");
const endDi = document.getElementById("end-modal");
const resetDi = document.getElementById("reset-modal");
const resetBtn = document.getElementById("btn-reset");
const quitBtn = document.getElementById("btn-quit");
const nextBtn = document.getElementById("btn-next");
const noBtn = document.getElementById("btn-no");
const yesBtn = document.getElementById("btn-yes");
const pveBtn = document.getElementById("btn-pve");
const pvpBtn = document.getElementById("btn-pvp");

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

const checkAndTakeCpuTurn = function () {
  if (model.isCpuTurn()) {
    let square = model.takeCpuTurn();
    if (square !== "") {
      chooseSquare(square);
    } else {
      console.log("error couldn't figure out a move");
    }
    view.updateBoard(model.state.board);
  }
};

const chooseSquare = function (square) {
  model.takeMove(square);
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
  } else {
    view.updatePlayerForNextTurn(model.currentToken());
    checkAndTakeCpuTurn();
  }
};

const boardClicked = function (event) {
  if (event.target.type !== "submit") return;

  const square = event.target.classList;

  if (square.contains("x") || square.contains("o")) return;

  chooseSquare(event.target.id.slice(-1));
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
  gameEl.classList.add("hidden");
  menuEl.classList.remove("hidden");
  endDi.close();
};

const nextGame = function () {
  model.reset();
  updateView();
  endDi.close();
};

const newPveGame = function () {
  const input = document.querySelector(".token:checked");
  model.newPve(input.value);
  checkAndTakeCpuTurn();
  updateView();
  menuEl.classList.add("hidden");
  gameEl.classList.remove("hidden");
};

const newPvpGame = function () {
  const input = document.querySelector(".token:checked");
  model.newPvp(input.value);
  updateView();
  menuEl.classList.add("hidden");
  gameEl.classList.remove("hidden");
};

boardEl.addEventListener("click", boardClicked);
resetBtn.addEventListener("click", resetClicked);
quitBtn.addEventListener("click", quitGame);
nextBtn.addEventListener("click", nextGame);
noBtn.addEventListener("click", cancelReset);
yesBtn.addEventListener("click", resetGame);
pveBtn.addEventListener("click", newPveGame);
pvpBtn.addEventListener("click", newPvpGame);

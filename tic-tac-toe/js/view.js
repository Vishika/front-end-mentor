const cssRoot = document.querySelector(":root");
const turnIconEl = document.getElementById("turn__icon");

export const updateBoard = function (board) {
  for (let i = 0; i < board.length; i++) {
    document.getElementById(`s-${i}`).classList.add(board[i]);
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

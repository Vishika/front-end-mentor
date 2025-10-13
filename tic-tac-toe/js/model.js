export const state = {
  turn: 1,
  status: "", // x | o | ""
  ties: 0,
  x: {
    wins: 0,
    human: true,
    p1: true,
  },
  o: {
    wins: 0,
    human: false,
    p1: false,
  },
  board: Array(9).fill(""),
};

const clearBoard = function () {
  return Array(9).fill("");
};

const same = function (a, b, c) {
  if (!state.board[a]) return false;

  return state.board[a] === state.board[b] && state.board[b] === state.board[c];
};

const checkWinner = function () {
  let winner = "";

  // horizontal win
  if (same(0, 1, 2)) winner = state.board[0];
  if (same(3, 4, 5)) winner = state.board[3];
  if (same(6, 7, 8)) winner = state.board[6];

  // vertical win
  if (same(0, 3, 6)) winner = state.board[0];
  if (same(1, 4, 7)) winner = state.board[1];
  if (same(2, 5, 8)) winner = state.board[2];

  // diagonal win
  if (same(0, 4, 8)) winner = state.board[0];
  if (same(2, 4, 6)) winner = state.board[2];

  if (winner) {
    state[winner].wins++;
    state.status = winner;
  } else if (state.turn > 9) {
    state.ties++;
    state.status = "t";
  }
};

export const currentToken = function () {
  return state.turn % 2 === 0 ? "o" : "x";
};

export const takeMove = function (squareNum) {
  if (state.winner) return;

  state.board[squareNum] = currentToken();
  state.turn++;
  checkWinner();
};

export const reset = function () {
  state.turn = 1;
  state.status = "";
  state.board = clearBoard();
};

export const quit = function () {
  state.turn = 1;
  state.status = "";
  state.board = clearBoard();
  state.ties = 0;
  state.x.wins = 0;
  state.o.wins = 0;
};

export const next = function () {
  state.turn = 1;
  state.status = "";
  state.board = clearBoard();
};

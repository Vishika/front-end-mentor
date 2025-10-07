export const state = {
  turn: 1,
  status: "",
  ties: 0,
  x: {
    wins: 0,
    human: true,
  },
  o: {
    wins: 0,
    human: false,
  },
  board: [],
};

const checkWinner = function () {
  let winner = false;

  // horizontal win
  if (
    state.board[0] &&
    state.board[0] === state.board[1] &&
    state.board[1] === state.board[2]
  )
    winner = state.board[0];
  if (
    state.board[3] &&
    state.board[3] === state.board[4] &&
    state.board[4] === state.board[5]
  )
    winner = state.board[3];
  if (
    state.board[6] &&
    state.board[6] === state.board[7] &&
    state.board[7] === state.board[8]
  )
    winner = state.board[6];

  // vertical win
  if (
    state.board[0] &&
    state.board[0] === state.board[3] &&
    state.board[3] === state.board[6]
  )
    winner = state.board[0];
  if (
    state.board[1] &&
    state.board[1] === state.board[4] &&
    state.board[4] === state.board[7]
  )
    winner = state.board[1];
  if (
    state.board[2] &&
    state.board[2] === state.board[5] &&
    state.board[5] === state.board[8]
  )
    winner = state.board[2];

  // diagonal win
  if (
    state.board[0] &&
    state.board[0] === state.board[4] &&
    state.board[4] === state.board[8]
  )
    winner = state.board[0];
  if (
    state.board[2] &&
    state.board[2] === state.board[4] &&
    state.board[4] === state.board[6]
  )
    winner = state.board[2];

  state.status = winner;

  // tie
  if (state.board.length === 9 && !state.board.includes(undefined)) {
    state.ties++;
    state.status = "tie";
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

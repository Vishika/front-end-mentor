export const aiLogging = false;

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

const rows = [
  // the order is important here as certain rows are preferable
  // cross
  [3, 4, 5],
  [1, 4, 7],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
  // horizontal
  [0, 1, 2],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [2, 5, 8],
];

const analyzeBoard = function () {
  let analyzedRows = [];
  for (let row of rows) {
    const analyzedRow = new Map();
    let x = 0;
    let o = 0;
    for (let pos of row) {
      let token = state.board[pos];
      if (token === "x") x++;
      if (token === "o") o++;
    }
    analyzedRow.set("row", row);
    analyzedRow.set("x", x);
    analyzedRow.set("o", o);
    analyzedRows.push(analyzedRow);
  }
  return analyzedRows;
};

const clearBoard = function () {
  return Array(9).fill("");
};

const checkWinner = function () {
  let winner = "";

  for (let analyzedRow of analyzeBoard()) {
    if (analyzedRow.get("x") === 3) {
      winner = "x";
    }
    if (analyzedRow.get("o") === 3) {
      winner = "o";
    }
  }

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

const otherToken = function () {
  if (currentToken() === "x") return "o";
  else return "x";
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

export const newPve = function (p1Token) {
  reset();
  state.ties = 0;
  state.x = {
    wins: 0,
    human: p1Token === "x",
    p1: p1Token === "x",
  };
  state.o = {
    wins: 0,
    human: p1Token === "o",
    p1: p1Token === "o",
  };
};

export const newPvp = function (p1Token) {
  newPve(p1Token);
  state.x.human = true;
  state.o.human = true;
};

export const isCpuTurn = function () {
  return !state[currentToken()].human;
};

export const takeCpuTurn = function () {
  if (!isCpuTurn()) return;

  if (aiLogging)
    console.log(`CPU: taking turn ${state.turn} as ${currentToken()}`);
  return cpuMove();
};

// see if there is a winning move to be made, the last in a row to be completed
const moveWin = function (analyzedRows) {
  for (let analyzedRow of analyzedRows) {
    if (
      analyzedRow.get(currentToken()) === 2 &&
      analyzedRow.get(otherToken()) === 0
    ) {
      for (let pos of analyzedRow.get("row")) {
        if (state.board[pos] === "") {
          return pos;
        }
      }
    }
  }
  return "";
};

// see if there is a move that can be made to prevent the oponent from winning
const moveBlock = function (analyzedRows) {
  for (let analyzedRow of analyzedRows) {
    if (
      analyzedRow.get(otherToken()) === 2 &&
      analyzedRow.get(currentToken()) === 0
    ) {
      for (let pos of analyzedRow.get("row")) {
        if (state.board[pos] === "") {
          return pos;
        }
      }
    }
  }
  return "";
};

// see if there is a move to be made that builds on existing rows towards a win
const moveBuild = function (analyzedRows) {
  // TODO: can improve on this to prioritize blocking
  for (let analyzedRow of analyzedRows) {
    if (
      analyzedRow.get(currentToken()) === 1 &&
      analyzedRow.get(otherToken()) === 0
    ) {
      for (let pos of analyzedRow.get("row")) {
        if (state.board[pos] === "") {
          return pos;
        }
      }
    }
  }
  return "";
};

// see if the middle square is free
const moveMiddle = function (_) {
  if (state.board[4] === "") {
    return 4;
  }
  return "";
};

// see if a corner square is free
const moveCorner = function (_) {
  const corners = [0, 2, 6, 8];
  const semiRandomCorners = corners.sort(() => Math.random() - 0.5);
  for (let corner of semiRandomCorners) {
    if (state.board[corner] === "") {
      return corner;
    }
  }
  return "";
};

// move to whereever there is a free space
const moveRemaining = function (_) {
  for (let pos in state.board) {
    if (state.board[pos] === "") {
      return pos;
    }
  }
  return "";
};

const strategies = [
  moveWin,
  moveBlock,
  moveBuild,
  moveMiddle,
  moveCorner,
  moveRemaining,
];

const cpuMove = function () {
  const analyzedBoard = analyzeBoard();

  for (let strategy of strategies) {
    if (aiLogging) {
      console.log("trying " + strategy.name + " strategy ...");
    }

    const move = strategy(analyzedBoard);

    if (move !== "" && aiLogging) {
      console.log("strategy " + strategy.name + " succeeded!");
    }

    if (move !== "") return move;
  }
};

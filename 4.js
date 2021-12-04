import input from "./input/4.js";

const [randomNumbersString, ...boardsStrings] = input.trim().split("\n\n");
const randomNumbers = randomNumbersString.split(",").map((n) => Number(n));
const checkedMap = {};
const boards = boardsStrings.map((board, boardIndex) => {
  checkedMap[boardIndex] = [];
  return board
    .trim()
    .split("\n")
    .map((line, index) => {
      const numArr = line
        .trim()
        .split(/\s+/)
        .map((n) => Number(n));
      checkedMap[boardIndex].push(new Array(numArr.length).fill(false));
      return numArr;
    });
});

let finalResult;

while (!finalResult && randomNumbers.length) {
  const currentNumber = randomNumbers.shift();
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const board = boards[boardIndex];
    let numberFound = false;
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < board[rowIndex].length; cellIndex++) {
        if (board[rowIndex][cellIndex] === currentNumber) {
          checkedMap[boardIndex][rowIndex][cellIndex] = true;
          numberFound = true;
          const isRowWin = isRowChecked(checkedMap, boardIndex, rowIndex);
          const isColumnWin = isColumnChecked(
            checkedMap,
            boardIndex,
            cellIndex
          );
          if (isRowWin || isColumnWin) {
            const winner = boardIndex;
            const sum = sumUnmarked(checkedMap, board, boardIndex);
            finalResult = sum * currentNumber;
          }

          break;
        }
      }
      if (numberFound) {
        break;
      }
    }
    if (finalResult !== undefined) {
      break;
    }
  }
}

console.log("finalResult", finalResult);

function isArrayChecked(array) {
  for (let result of array) {
    if (!result) {
      return false;
    }
  }
  return true;
}

function isRowChecked(checkedMap, boardIndex, rowIndex) {
  return isArrayChecked(checkedMap[boardIndex][rowIndex]);
}

function isColumnChecked(checkedMap, boardIndex, rowIndex) {
  return isArrayChecked(checkedMap[boardIndex].map((row) => row[rowIndex]));
}

function sumUnmarked(checkedMap, board, boardIndex) {
  let sum = 0;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < board[rowIndex].length; cellIndex++) {
      if (!checkedMap[boardIndex][rowIndex][cellIndex]) {
        sum += board[rowIndex][cellIndex];
      }
    }
  }
  return sum;
}

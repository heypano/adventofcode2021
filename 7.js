import input from "./input/7.js";

function calculateMovesToNumber(array, number) {
  return array.reduce((sum, current) => sum + Math.abs(current - number), 0);
}

const array = input.split(",").map((n) => Number(n));
const median = array.sort((a, b) => b - a)[Math.floor(array.length / 2)];
const numMoves = calculateMovesToNumber(array, median);
console.log(numMoves);

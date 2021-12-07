import input from "./input/7.js";

function calculateMovesToNumber(array, number) {
  return array.reduce((sum, current) => {
    const steps = Math.abs(current - number);
    return sum + (steps * (steps + 1)) / 2;
  }, 0);
}

const array = input
  .split(",")
  .map((n) => Number(n))
  .sort((a, b) => a - b);

let lowest = null;
for (let current = array[0]; current < array[array.length - 1]; current++) {
  const moves = calculateMovesToNumber(array, current);
  if (lowest === null || moves < lowest) {
    lowest = moves;
  }
}
console.log(lowest);

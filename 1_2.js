import input from "./input/1.js";

// https://adventofcode.com/2021/day/1

// Sum #window number of elements starting at index-window
const sumSliding = (array, index, window = 3) => {
  const current = array[index];
  const previous = array[index - 1];
  const paraPrevious = array[index - 2];
  return current + previous + paraPrevious;
};

const result = input.reduce((timesIncreased, current, index) => {
  if (index > 2) {
    const currentSum = sumSliding(input, index);
    const previousSum = sumSliding(input, index - 1);
    if (currentSum > previousSum) {
      return timesIncreased + 1;
    }
  }
  return timesIncreased;
}, 0);

console.log(result);

import input from "./input/1.js";

// https://adventofcode.com/2021/day/1

const result = input.reduce((timesIncreased, current, index) => {
  if (index > 0) {
    const previous = input[index - 1];
    if (current > previous) {
      return timesIncreased + 1;
    }
  }
  return timesIncreased;
}, 0);

console.log(result);

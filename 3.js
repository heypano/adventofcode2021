import input from "./input/3.js";

const numbers = input
  .trim()
  .split("\n")
  .map((number) => number.split("").map((n) => Number(n)));
const length = numbers[0].length; // all numbers are same length
export const calculateGammaAndEpsilon = (numbers, prioritize) => {
  let gamma = "";
  let epsilon = "";
  const equalIndices = {};
  for (let i = 0; i < length; i++) {
    const ones = numbers
      .map((digits) => digits[i])
      .filter((digit) => digit).length;
    const zeroes = numbers.length - ones;
    if (ones === zeroes) {
      equalIndices[i] = true;
    }

    if (ones > zeroes) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return { gamma, epsilon, equalIndices };
};
let { gamma, epsilon } = calculateGammaAndEpsilon(numbers);
gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);
console.log(gamma * epsilon);

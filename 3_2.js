import input from "./input/3.js";
import { calculateGammaAndEpsilon } from "./3.js";

let numbers = input
  .trim()
  .split("\n")
  .map((number) => number.split("").map((n) => Number(n)));
const numDigits = numbers[0].length; // all numbers are same length

const calculate = (argNumbers, criterion) => {
  let currentIndex = 0;
  let numbers = argNumbers;
  while (numbers.length > 1) {
    const { gamma, equalIndices } = calculateGammaAndEpsilon(numbers);
    console.log(equalIndices);
    numbers = numbers.filter((number) => {
      const digit = number[currentIndex];
      const mostPopular = Number(gamma[currentIndex]);
      if (criterion === "oxygen") {
        return (
          digit === mostPopular || (equalIndices[currentIndex] && digit === 1)
        );
      } else {
        return (
          digit !== mostPopular || (equalIndices[currentIndex] && digit === 0)
        );
      }
    });
    if (currentIndex < numDigits - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  }
  return numbers[0].join("");
};
const oxygen = parseInt(calculate(numbers, "oxygen"), 2);
const co2 = parseInt(calculate(numbers, "co2"), 2);
console.log(oxygen, co2, oxygen * co2);

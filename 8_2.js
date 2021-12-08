import input from "./input/8_easy.js";
import {
  digits,
  getLengthMap,
  getLetterMap,
  getUniqueDigitLengths,
} from "./8.js";

const lengthMap = getLengthMap(digits);

// Which segments lengths are unique (and what is the digit)
const uniqueDigitLengths = getUniqueDigitLengths(lengthMap);

const letterMap = getLetterMap(digits);

const entries = input
  .replace(/\|\n/g, "| ")
  .split("\n")
  .map((entry) => {
    return entry.split(/\s*\|\s*/);
  });

for (let entry of entries) {
  const [patterns, digitOutput] = entry;
  const decodeMap = {};
  const encodedDigits = digitOutput.trim().split(/\s+/);
  encodedDigits.forEach((encodedDigit) => {
    const uniqueDigit = uniqueDigitLengths[encodedDigit.length];
    if (uniqueDigit) {
      console.log(`${encodedDigit} is ${uniqueDigit}`);
    }
  });
  // console.log(encodedDigits);
  break;
}

// 4digit
// console.log(entries);

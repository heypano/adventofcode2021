import input from "./input/8.js";

const digits = {
  0: { segments: ["a", "b", "c", "e", "f", "g"] },
  1: { segments: ["c", "f"] },
  2: { segments: ["a", "c", "d", "e", "g"] },
  3: { segments: ["a", "c", "d", "f", "g"] },
  4: { segments: ["b", "c", "d", "f"] },
  5: { segments: ["a", "b", "d", "f", "g"] },
  6: { segments: ["a", "b", "d", "e", "f", "g"] },
  7: { segments: ["a", "c", "f"] },
  8: { segments: ["a", "b", "c", "d", "e", "f", "g"] },
  9: { segments: ["a", "b", "c", "d", "f", "g"] },
};

/** By length: what digits have a segment array of that length */
// e.g. {5: [ '2', '3', '5' ]},
const lengthMap = {};
Object.keys(digits).forEach((digit) => {
  if (!lengthMap[digits[digit].segments.length]) {
    lengthMap[digits[digit].segments.length] = [];
  }
  lengthMap[digits[digit].segments.length].push(digit);
});

// Which segments lengths are unique (and what is the digit)
const uniqueDigitLengths = Object.fromEntries(
  Object.keys(lengthMap)
    .filter((key) => {
      const array = lengthMap[key];
      return array.length === 1;
    })
    .map((length) => {
      const digit = lengthMap[length][0];
      return [length, digit];
    })
);

/** By letter: what segments are included */
const letterMap = {};
// e.g. {a: {1: true}}
Object.keys(digits).forEach((digit) => {
  const letters = digits[digit].segments;
  letters.forEach((letter) => {
    if (!letterMap[letter]) letterMap[letter] = {};
    letterMap[letter][digit] = true;
  });
});

const entries = input
  .replace(/\|\n/g, "| ")
  .split("\n")
  .map((entry) => {
    return entry.split(/\s*\|\s*/);
  });

let totalUnique = 0;
entries.forEach((entry) => {
  const [patterns, digitOutput] = entry;
  const encodedDigits = digitOutput.trim().split(/\s+/);
  encodedDigits.forEach((encodedDigit) => {
    if (uniqueDigitLengths[encodedDigit.length]) {
      totalUnique++;
      // console.log(
      //   `${encodedDigit} is unique (Length ${encodedDigit.length}) digit ${
      //     uniqueDigitLengths[encodedDigit.length]
      //   }`
      // );
    }
  });
});
console.log(totalUnique);

// 4digit
// console.log(entries);

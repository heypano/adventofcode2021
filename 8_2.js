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

// console.log(digits);
// console.log(letterMap);

for (let entry of entries) {
  const [patterns, digitOutput] = entry;
  const digitDecodeMap = {};
  const potentialCharMap = {};
  const encodedDigits = patterns.trim().split(/\s+/);
  encodedDigits.forEach((encodedDigit) => {
    const uniqueDigit = Number(uniqueDigitLengths[encodedDigit.length]);
    if (Number.isInteger(uniqueDigit)) {
      const actualEncoding = digits[uniqueDigit].segments;
      console.log(uniqueDigit, encodedDigit, actualEncoding);
      digitDecodeMap[encodedDigit] = uniqueDigit;
      [...encodedDigit].forEach((encodedChar) => {
        if (!potentialCharMap[encodedChar]) {
          potentialCharMap[encodedChar] = {};
          actualEncoding.forEach((actualEncodingChar) => {
            potentialCharMap[encodedChar][actualEncodingChar] = true;
          });
          // encodedChar is b
          // right now potentialCharMap[encodedChar] is { c: true, f: true }
          // which other encoded digits contain `b` ?
          const otherEncodedDigitsWithThisChar = encodedDigits.filter(
            (d) => d.includes(encodedChar) && uniqueDigitLengths[d.length]
          );
          // otherEncodedDigitsWithThisChar.forEach((otherEncodedDigit) => {
          //   const otherUniqueDigit = Number(
          //     uniqueDigitLengths[otherEncodedDigit.length]
          //   );
          //   if (otherUniqueDigit) {
          //   }
          // });
          console.log(
            `Others with ${encodedChar}:`,
            otherEncodedDigitsWithThisChar
          );
        }
        // else {
        //   const potentialChars = potentialCharMap[encodedChar];
        //   Object.keys(potentialChars).forEach((potentialChar) => {
        //     if (!encodedDigit.includes(potentialChar)) {
        //       console.log(
        //         `AHA! ${encodedChar} cannot possibly be ${potentialChar} since it's not in ${encodedDigit}`
        //       );
        //       delete potentialChars[potentialChar];
        //     }
        //   });
        //   console.log(`${encodedChar} already has an entry`, potentialChars);
        // }
      });
      // console.log("AAA", potentialCharMap);
      // console.log("\n");
      // console.log(`${encodedDigit} is ${uniqueDigit}`);
    } else {
      digitDecodeMap[encodedDigit] = null;
    }
  });
  console.log(potentialCharMap);
  // console.log(encodedDigits);
  break;
}

// 4digit
// console.log(entries);

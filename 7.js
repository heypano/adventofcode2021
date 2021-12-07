import input from "./input/7.js";

function getData(array) {
  const map = {};
  const sorted = array.sort((a, b) => b - a);
  let mean,
    meanCount = 0;
  for (let elem of array) {
    map[elem] = map[elem] ? map[elem] + 1 : 1;
    if (map[elem] > meanCount) {
      mean = elem;
      meanCount = map[elem];
    }
  }
  return {
    mean: Number(mean),
    meanCount,
    map,
    sorted,
    median: sorted[Math.floor(sorted.length / 2)],
  };
}

function calculateMovesToNumber(array, mean) {
  return array.reduce((sum, current) => sum + Math.abs(current - mean), 0);
}

const array = input.split(",").map((n) => Number(n));
const { map, mean, meanCount, sorted, median } = getData(array);
const calculation = calculateMovesToNumber(array, median);
const thing = Object.keys(map)
  .sort((keyA, keyB) => map[keyB] - map[keyA])
  .map((key) => {
    return { [key]: map[key] };
  });
console.log(calculation);

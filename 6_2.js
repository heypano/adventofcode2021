import input from "./input/6.js";

function getNewTimerMap() {
  const timerMap = {};
  new Array(10).fill(0).map((_, index) => (timerMap[index] = 0));
  return timerMap;
}
const timerMap = getNewTimerMap();

input.split(",").forEach((initialTimer) => {
  timerMap[initialTimer]++;
});

for (let day = 0; day < 256; day++) {
  for (let timer = 0; timer <= 9; timer++) {
    const numFishesInValue = timerMap[timer];
    if (numFishesInValue) {
      if (timer === 0) {
        timerMap[9] += numFishesInValue;
        timerMap[7] += numFishesInValue;
      } else {
        timerMap[timer - 1] += numFishesInValue;
      }
      timerMap[timer] -= numFishesInValue;
    }
  }
}
console.log(
  timerMap,
  Object.values(timerMap).reduce((sum, val) => sum + val)
);

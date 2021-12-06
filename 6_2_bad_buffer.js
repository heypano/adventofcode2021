import input from "./input/6.js";

function processDay(timer) {
  if (timer === 0) {
    return { timer: 6, generate: true };
  } else {
    return { timer: timer - 1 };
  }
}

let buffer = Buffer.from(input.split(",").map((i) => Number(i)));
for (let day = 0; day < 256; day++) {
  console.log(`${new Date().toTimeString()}: Day ${day + 1}`);
  const newFishes = Buffer.alloc(buffer.length);
  let newFishesIndex = 0;
  for (let index = 0; index < buffer.length; index++) {
    const f = buffer[index];
    const { timer, generate } = processDay(f);
    // console.log(`Processing ${f} - timer ${timer} generate ${generate}`);
    buffer[index] = timer;
    if (generate) {
      newFishes[newFishesIndex] = 8;
      newFishesIndex++;
    }
  }
  const newBuffer = Buffer.concat(
    [buffer, newFishes],
    buffer.length + newFishesIndex
  );
  // console.log(`Day ${day + 1}`, newFishes, buffer);
  buffer = newBuffer;
}
console.log(buffer.length);

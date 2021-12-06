import input from "./input/6.js";

class LanternFish {
  timer;
  name;
  onGenerate = () => {
    console.log("override this");
  };
  constructor({ initialTimer = 8, onGenerate, name }) {
    // console.log(initialTimer);
    this.timer = initialTimer;
    this.name = name;
    if (onGenerate) {
      this.onGenerate = onGenerate.bind(this);
    }
    this.processDay = this.processDay.bind(this);
  }
  generate() {
    // console.log(`${this.name} generating`);
    this.onGenerate();
  }
  processDay() {
    // console.log("Processing day", this.timer);
    if (this.timer === 0) {
      this.generate();
      this.timer = 6;
    } else {
      this.timer--;
    }
  }
  print() {
    console.log(`timer ${this.timer}`);
  }
  reset() {
    // console.log(this.timer);
    this.timer = 6;
  }
}

const fishes = [];

let counter = 1;

function generateFish(initialTimer) {
  // console.log("Generating");
  const newFish = new LanternFish({
    initialTimer,
    onGenerate: generateFish,
    name: `Fish ${counter}`,
  });
  fishes.push(newFish);
  counter++;
}

input.split(",").forEach((initialTimer) => generateFish(Number(initialTimer)));

for (let day = 0; day < 80; day++) {
  console.log(`Day ${day + 1}`);
  fishes.forEach((f) => {
    f.processDay();
  });
  // console.log(fishes.map((fa) => fa.timer).join(","));
}
console.log(fishes.length);

import input from "./input/6_easy.js";

class LanternFish {
  timer;
  shouldGenerate = false;
  justBorn = true;
  constructor({ initialTimer = 8, onGenerate }) {
    console.log(initialTimer);
    this.timer = initialTimer;
    if (onGenerate) {
      this.onGenerate = onGenerate.bind(this);
    }
    this.processDay = this.processDay.bind(this);
  }
  onGenerate = () => {
    console.log("override this");
  };
  processDay() {
    // console.log("Processing day", this.timer);
    if (this.justBorn) {
      this.justBorn = false;
    } else if (this.shouldGenerate) {
      this.onGenerate();
      this.shouldGenerate = false;
      this.timer--;
    } else if (this.timer === 0) {
      this.timer = 6;
      this.shouldGenerate = true;
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

function generateFish(initialTimer) {
  // console.log("Generating");
  const newFish = new LanternFish({
    initialTimer,
    onGenerate: generateFish,
  });
  fishes.push(newFish);
}

input.split(",").forEach((initialTimer) => generateFish(Number(initialTimer)));

for (let day = 0; day < 5; day++) {
  fishes.forEach((f) => {
    f.processDay();
  });
  console.log(fishes.map((fa) => fa.timer));
}

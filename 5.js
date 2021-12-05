import input from "./input/5.js";

const entries = input
  .trim()
  .split("\n")
  .map((entry) => entry.split(" -> ").map((point) => point.split(",")));
const floorGrid = {};

entries.forEach((entry) => {
  const [point1, point2] = entry;
  draw(floorGrid, point1, point2);
});

let intersectingPoints = 0;
Object.values(floorGrid).forEach((row) => {
  Object.values(row).forEach((point) => {
    if (point > 1) {
      intersectingPoints += 1;
    }
  });
});
printGrid(floorGrid);
console.log(intersectingPoints);

function printGrid(grid) {
  const height = Number(
    Object.keys(grid).sort((a, b) => Number(a) - Number(b))[
      Object.keys(grid).length - 1
    ]
  );
  const width = Object.keys(grid).reduce((maxWidth, rowKey) => {
    const row = grid[rowKey];
    const max = Object.keys(row).sort((a, b) => Number(a) - Number(b))[
      Object.keys(row).length - 1
    ];
    return Math.max(Number(max), maxWidth);
  }, 0);
  for (let i = 0; i <= height; i++) {
    let result = "";
    for (let j = 0; j <= width; j++) {
      result += grid?.[i]?.[j] ? grid[i][j] : 0;
    }
    console.log(result);
  }
}

function getMinMax(a, b) {
  let min, max;
  if (a > b) {
    max = a;
    min = b;
  } else {
    max = b;
    min = a;
  }
  return { min, max };
}

function drawDirection(map, stable, min, max, type) {
  for (let i = min; i <= max; i++) {
    if (type === "horizontal") {
      if (!map[stable]) {
        map[stable] = {};
      }
      map[stable][i] = map[stable][i] ? map[stable][i] + 1 : 1;
    } else if (type === "vertical") {
      if (!map[i]) {
        map[i] = {};
      }
      map[i][stable] = map[i][stable] ? map[i][stable] + 1 : 1;
    }
  }
}

function draw(map, point1, point2) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  if (y1 === y2) {
    // horizontal
    const { min, max } = getMinMax(x1, x2);
    drawDirection(floorGrid, y1, min, max, "horizontal");
  } else if (x1 === x2) {
    // vertical
    const { min, max } = getMinMax(y1, y2);
    drawDirection(floorGrid, x1, min, max, "vertical");
  }
}

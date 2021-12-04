import input from "./input/2.js";

const commands = input.split("\n");

const initialCoordinates = {
  depth: 0,
  horizontal: 0,
};

const matchRegex = /^(?<direction>.+) (?<units>.+)$/;
const finalCoordinates = commands.reduce((currentCoodinates, command) => {
  const { groups } = command.match(matchRegex);
  const { direction, units: stringUnits } = groups;
  const { depth, horizontal } = currentCoodinates;
  const units = Number(stringUnits);

  switch (direction) {
    case "forward":
      return { ...currentCoodinates, horizontal: horizontal + units };
    case "up":
      return { ...currentCoodinates, depth: depth - units };
    case "down":
    default:
      return { ...currentCoodinates, depth: depth + units };
  }
  return currentCoodinates;
}, initialCoordinates);
const { depth, horizontal } = finalCoordinates;
console.log(depth * horizontal);

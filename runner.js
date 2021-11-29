#!/usr/bin/env node

import { access } from "fs/promises";
import { spawn } from "child_process";

// import util from "util";
// const { promisify } = util;
// const spawn = promisify(basicSpawn);

(async () => {
  const [exerciseNumber] = process.argv.slice(2);
  const path = `./${exerciseNumber}.js`;
  try {
    await access(path);
    const command = spawn("node", [path]);

    command.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    command.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    command.on("error", (error) => {
      console.log(`error: ${error.message}`);
    });

    command.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (e) {
    console.log(`File ${path} does not exist (or is not accessible)`);
  }
})();

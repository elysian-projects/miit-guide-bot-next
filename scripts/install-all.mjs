/* eslint-disable no-undef */
// @ts-check

import { exec } from "child_process";
import fs from "fs";
import path from "path";

// Directories from the base directory to install packages
const baseDirs = ["packages"];

function main() {
  const nodePackagePaths = baseDirs.flatMap(baseDir => findSubDirectory(baseDir));
  nodePackagePaths.forEach(packagePath => execInstall(path.resolve(process.cwd(), packagePath)));
}

function findSubDirectory(baseDir) {
  return fs.readdirSync(baseDir).map(currPath => `${baseDir}/${currPath}`);
}

function execInstall(directory) {
  exec(`cd ${directory} && npm install`)
  .on("exit", code => {
    if(code === 0) {
      console.log("Successfully installed:", directory);
    } else {
      console.log("Failed installing:", directory);
    }
  });
}

main();

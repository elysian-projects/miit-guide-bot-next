import { exec } from "child_process";
import console from "console";
import path from "path";
import process from "process";
import { baseDirs, getAllSubdirectories } from "./directory.mjs";

function main() {
  const nodePackagePaths = baseDirs.flatMap(baseDir => getAllSubdirectories(baseDir));
  nodePackagePaths.forEach(packagePath => execInstall(path.resolve(process.cwd(), packagePath)));
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

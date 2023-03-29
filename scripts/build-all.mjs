import { exec } from "child_process";
import console from "console";
import path from "path";
import process from "process";
import { getArgvByKey } from "./argv-parser.mjs";
import { baseDirs, getAllSubdirectories } from "./directory.mjs";

function main() {
  const excludes = getArgvByKey("--exclude").split(":");
  const nodePackagePaths = baseDirs.flatMap(baseDir => getAllSubdirectories(baseDir)).filter(dir => !excludes.includes(dir));
  nodePackagePaths.forEach(packagePath => execBuild(path.resolve(process.cwd(), packagePath)));
}

function execBuild(directory) {
  exec(`cd ${directory} && npm run build`)
  .on("exit", code => {
    if(code === 0) {
      console.log("Successfully built:", directory);
    } else {
      console.log("Failed building:", directory);
    }
  });
}

main();

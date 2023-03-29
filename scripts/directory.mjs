import fs from "fs";

export const baseDirs = ["packages"];

/**
 * @param {string} baseDirectory
 * @returns {string[]}
 */
export const getAllSubdirectories = (baseDirectory) => {
  return fs.readdirSync(baseDirectory).map(currentPath => `${baseDirectory}/${currentPath}`);
};

import process from "process";

/**
 * @param {string} key
 * @return {string}
 */
export const getArgvByKey = (key) => {
  for(let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];

    if(arg === key && process.argv[i + 1] !== undefined) {
      return process.argv[i + 1];
    }
  }

  return "";
};

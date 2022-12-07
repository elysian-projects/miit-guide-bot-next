import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  get: (key: string): string => {
    if(!key) {
      throw new Error("Invalid config key!");
    }

    return process.env[key] || "";
  }
};

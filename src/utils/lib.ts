import { Bot } from "grammy";

export const createBot = (token: string): Bot => {
  return new Bot(token);
};

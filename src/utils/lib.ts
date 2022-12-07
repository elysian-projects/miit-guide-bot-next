import { Telegraf } from "telegraf";

export const createBot = (token: string): Telegraf => {
  return new Telegraf(token);
};

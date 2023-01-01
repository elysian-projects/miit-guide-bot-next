import { StoreController } from "@/controllers/storeController";
import { tabs } from "@/env";
import { LocationList } from "@/types/location";
import { UserId } from "@/types/user";
import { Context } from "grammy";

export const excursionHandler = (ctx: Context) => {
  ctx.reply(tabs.excursion.reply, {reply_markup: tabs.excursion.buttons});
};

export const initUserForExcursion = (_: Context, storeController: StoreController, options: {userId: UserId, location: keyof LocationList}) => {
  const {userId} = options;

  if(storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} already exists and can't be signed up for excursion!`);
  }

  storeController.addUser(userId);
};

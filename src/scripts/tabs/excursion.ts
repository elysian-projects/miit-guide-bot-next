import { storeController } from "@/env";
import { Events } from "@/types/event";
import { LocationsList } from "@/types/location";
import { UserData, UserId, UserStatus } from "@/types/user";
import { getTabData } from "@/utils/data";
import { Pagination } from "@/utils/pagination";
import { Context } from "grammy";

export const excursionHandler = (ctx: Context) => {
  // This definitely should NOT throw an exception but invalid context is the Telegram API
  // issue, so if this exception is thrown, there is a problem with Telegram and there must
  // be a better way to handle it rather than just throwing an exception
  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Invalid context!");
  }

  const userId = ctx.chat.id;

  // Remove user from the list in case of unexpected user behavior or improper script execution,
  // this method should NOT throw an exception, so if the user is not on the list, it won't break
  storeController.removeUser(userId);

  const tabData = getTabData("excursion");

  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});

  if(storeController.addUser(userId)) {
    storeController.getUser(userId).setStatus(UserStatus.EXCURSION_HUB);
  }
};

export const initUserForExcursion = (ctx: Context, options: {userId: UserId, location: keyof LocationsList}) => {
  const {userId} = options;

  // TODO: get data from server here
  const userData: UserData = {
    title: "Some title",
    content: [
      // picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"
      {label: "Title 1", content: "Some info to title 1"},
      {label: "Title 2", content: "Some info to title 2", links: ["link1", "link2"]},
      {label: "Title 3", content: "Some info to title 3"},
    ],
    step: 0
  };

  storeController.getUser(userId).setStatus(UserStatus.IN_PROCESS);
  storeController.getUser(userId).setData(userData);

  const controlFlow = new Pagination();

  storeController.getUser(userId).event.on(Events.changeStep, () => controlFlow.sendData(ctx, userId));

  controlFlow.sendData(ctx, userId);
};

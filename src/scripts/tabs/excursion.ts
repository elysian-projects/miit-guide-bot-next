import { storeController, tabs } from "@/env";
import { LocationList } from "@/types/location";
import { UserData, UserId, UserStatus } from "@/types/user";
import { Pagination } from "@/utils/pagination";
// import { Separator } from "@/utils/separator";
import { Context } from "grammy";

// FIXME: refactor this

export const excursionHandler = (ctx: Context) => {
  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Invalid context!");
  }

  const userId = ctx.chat.id;

  if(storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} already exists and can't be signed up for excursion!`);
  }

  ctx.reply(tabs.excursion.reply, {reply_markup: tabs.excursion.buttons});

  storeController.addUser(userId);
  storeController.setUserStatus(userId, UserStatus.EXCURSION_HUB);
};

export const initUserForExcursion = (ctx: Context, options: {userId: UserId, location: keyof LocationList}) => {
  const {userId} = options;

  // TODO: get data from server here
  const userData: UserData = {
    title: "Some title",
    content: [
      {title: "Title 1", information: "Some info to title 1", picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
      {title: "Title 2", information: "Some info to title 2", links: ["link1", "link2"], picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
      {title: "Title 3", information: "Some info to title 3", picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
    ],
    step: 0
  };

  storeController.setUserStatus(userId, UserStatus.IN_PROCESS);
  storeController.setUserData(userId, userData);

  const controlFlow = new Pagination();

  storeController.on(userId, "changeStep", () => controlFlow.sendData(ctx, userId));

  controlFlow.sendData(ctx, userId);
};

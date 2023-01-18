import { IControlFlow } from "@/components/control-flow/types";
import { storeController } from "@/env";
import { LocationsList } from "@/external/locations";
import { IUser } from "@/types/controllers";
import { UserData, UserId, UserStatus } from "@/types/user";
import { computeTabProps } from "@/utils/common";
import { Context } from "grammy";

export const excursionHandler = (ctx: Context) => {
  const {userId, tabData} = computeTabProps(ctx, "excursion");

  storeController.addUser(userId);
  storeController.getUser(userId).setStatus(UserStatus.EXCURSION_HUB);

  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};

export const initUserForExcursion = (ctx: Context, options: {userId: UserId, location: LocationsList, controlFlow: IControlFlow}) => {
  const {userId, location, controlFlow} = options;
  const locationData = fetchDataFromServer(location);

  setUserState(storeController.getUser(userId), locationData);

  // Avoiding copy-past
  function send() {
    controlFlow.sendData(ctx, userId);
  }

  // Attach the `send` function to give the `storeController` the control over
  // when a new message must be sent for a concrete user
  storeController.getUser(userId).addChangeStepHandler(send);

  // First step can't we handled the other way, so we need to call it manually
  send();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchDataFromServer = (_location: LocationsList): UserData => {
  // TODO: get data from server here
  return {
    title: "Some title",
    content: [
      {label: "Title 1", content: "Some info to title 1", picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
      {label: "Title 2", content: "Some info to title 2", links: ["link1", "link2"], picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
      {label: "Title 3", content: "Some info to title 3", picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"},
    ],
    step: 0
  };
};

const setUserState = (user: IUser, locationData: UserData): void => {
  user.setStatus(UserStatus.IN_PROCESS);
  user.setData(locationData);
};
import { Pagination } from "@/components/control-flow";
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

export const initUserForExcursion = (ctx: Context, options: {userId: UserId, location: LocationsList}) => {
  const {userId, location} = options;

  const locationData = fetchDataFromServer(location);
  const controlFlow = new Pagination();

  setUserState(storeController.getUser(userId), locationData);

  storeController.getUser(userId).addChangeStepHandler(() => controlFlow.sendData(ctx, userId));

  controlFlow.sendData(ctx, userId);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchDataFromServer = (_location: LocationsList): UserData => {
  // TODO: get data from server here
  return {
    title: "Some title",
    content: [
      // picture: "https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159"
      {label: "Title 1", content: "Some info to title 1"},
      {label: "Title 2", content: "Some info to title 2", links: ["link1", "link2"]},
      {label: "Title 3", content: "Some info to title 3"},
    ],
    step: 0
  };
};

const setUserState = (user: IUser, locationData: UserData): void => {
  user.setStatus(UserStatus.IN_PROCESS);
  user.setData(locationData);
};
import { Separation } from "@/components/control-flow";
// import { Pagination } from "@/components/control-flow/pagination";
import { storeController } from "@/env";
import { LocationsList } from "@/external/locations";
import { IUser } from "@/types/controllers";
import { Events } from "@/types/event";
import { UserData, UserId, UserStatus } from "@/types/user";
import { computeTabProps } from "@/utils/common";
import { Context } from "grammy";

export const excursionHandler = (ctx: Context) => {
  const {userId, tabData} = computeTabProps(ctx, "excursion");

  // Remove user from the list in case of unexpected user behavior or improper script execution,
  // this method should NOT throw an exception, so if the user is not on the list, it won't break
  storeController.removeUser(userId);

  storeController.addUser(userId);
  storeController.getUser(userId).setStatus(UserStatus.EXCURSION_HUB);

  console.log(storeController.getUser(userId).event);

  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};

export const initUserForExcursion = (ctx: Context, options: {userId: UserId, location: LocationsList}) => {
  const {userId, location} = options;

  const locationData = fetchDataFromServer(location);
  const controlFlow = new Separation();

  setUserState(storeController.getUser(userId), locationData);

  storeController.getUser(userId).event.on(Events.changeStep, () => controlFlow.sendData(ctx, userId));
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
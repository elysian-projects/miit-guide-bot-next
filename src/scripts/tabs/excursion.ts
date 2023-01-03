import { KeyboardButtons } from "@/constants/buttons";
import { storeController, tabs } from "@/env";
import { ButtonImage, MessageProps } from "@/types/lib";
import { LocationList } from "@/types/location";
import { UserData, UserId, UserStatus } from "@/types/user";
import { formatCountLabel, formatMessage } from "@/utils/formatters";
import { createKeyboard } from "@/utils/keyboard";
import { Context } from "grammy";

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
      {title: "Title 2", information: "Some info to title 2", links: ["link1", "link2"]},
      {title: "Title 3", information: "Some info to title 3"},
    ],
    step: 0
  };

  storeController.setUserStatus(userId, UserStatus.IN_PROCESS);
  storeController.setUserData(userId, userData);

  // FIXME: maybe make these calls with the event system?
  sendDataNode(ctx, userId);
};

export const sendDataNode = (ctx: Context, userId: UserId) => {
  if(!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }

  const currentContent = storeController.getCurrentContent(userId);

  const message = formatMessage(currentContent);

  const controls: ButtonImage[] = [
    KeyboardButtons.PREV,
    {value: "count", label: formatCountLabel(storeController.getUserData(userId))},
  ];

  controls.push(storeController.isLastStep(userId)
                  ? KeyboardButtons.HUB
                  : KeyboardButtons.NEXT);

  const keyboard = createKeyboard("inline", controls, {oneTime: true, columns: 3});

  const props: MessageProps = {
    reply_markup: keyboard,
    parse_mode: "MarkdownV2"
  };

  currentContent.picture
          ? ctx.replyWithPhoto(currentContent.picture, {caption: message, ...props})
          : ctx.reply(message, {...props});
};

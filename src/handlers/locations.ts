import { storeController } from "@/bootstrap";
import { onStart } from "@/chat/commands";
import { Pagination } from "@/components/control-flow";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { LocationValues } from "@/types/location";
import { UserData } from "@/types/user";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";

export const handleLocationClick = (ctx: Context) => {
  removeInlineReplyMarkup(ctx);

  const chatId = getChatId(ctx);
  const locationData = ctx.callbackQuery?.data ?? ctx.msg?.text;

  if(!locationData) {
    throw new Error("Invalid context, couldn't handle location choice!");
  }

  const data = fetchData(locationData as LocationValues);

  if(!data) {
    userHandleError(ctx);
    return;
  }

  const controlFlow = new Pagination();

  storeController.addUser(chatId).setData(data);

  // Avoiding copy-past
  function send() {
    controlFlow.sendData(ctx, chatId);
  }

  // Attach the `send` function to give the `storeController` the control over
  // when a new message must be sent for a concrete user
  storeController.getUser(chatId).addChangeStepHandler(send);

  // First step can't we handled the other way, so we need to call it manually
  send();
};

/** This function must handle an error so the application doesn't break down */
const userHandleError = async (ctx: Context) => {
  await ctx.reply("Произошла непредвиденная ошибка!");
  onStart(ctx);
};

// TODO: implement fetching data from the server
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = (_location: LocationValues): UserData => {
  return {
    title: "",
    content: [
      {label: "Заголовок 1", content: "Контент к заголовку 1", picture: "https://miit.ru/content/%E2%84%96%201.jpg?id_wm=797689&SWidth=1920"},
      {label: "Заголовок 2", content: "Контент к заголовку 2", picture: "https://miit.ru/content/%E2%84%96%201.jpg?id_wm=797689&SWidth=1920"},
    ],
    step: 0
  };
};

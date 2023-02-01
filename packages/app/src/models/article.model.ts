import { store } from "@/bootstrap";
import { Pagination, Separation } from "@/components/control-flow";
import { UserDataContent } from "@/types/user";
import { getChatId } from "@/utils/common";
import { getArticleType } from "@/utils/contentManager";
import { Context } from "grammy";

export const articleModel = async (ctx: Context, data: UserDataContent[]) => {
  const type = getArticleType(data);
  const chatId = getChatId(ctx);

  if(type === "invalid") {
    throw new Error("Given content is of different article type!");
  }

  const controlFlow = (type === "article")
    ? new Pagination()
    : new Separation();

  const changeStepHandler = () => {
    controlFlow.sendData(ctx, chatId);
  };

  store.addUser(chatId).setContent(data);
  store.getUser(chatId).addChangeStepHandler(changeStepHandler);

  changeStepHandler();
};

import { store } from "@/bootstrap";
import { Pagination, Separation } from "@/components/control-flow";
import { ArticleType } from "@/types/content";
import { UserDataContent } from "@/types/user";
import { getChatId } from "@/utils/common";
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

const getArticleType = (content: UserDataContent[]): ArticleType | "invalid" => {
  const types = content.map(item => item.type);

  return types.every(value => value === "article")
    ? "article"
    : types.every(value => value === "location")
    ? "location"
    : "invalid";
};

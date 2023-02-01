import { store } from "@/bootstrap";
import { createReplyMarkup, removeInlineReplyMarkup } from "@/components/reply-markup";
import { keyboardControls } from "@/constants/controls";
import { EXCURSION_REPLY } from "@/constants/messages";
import { onStart } from "@/controllers/commands.controller";
import { ArticleType } from "@/types/content";
import { Image } from "@/types/lib";
import { IResponse } from "@/types/server";
import { UserDataContent } from "@/types/user";
import { getChatId } from "@/utils/common";
import { getApiURL } from "@/utils/server";
import { sendMessage } from "@/views/general.view";
import axios, { AxiosError } from "axios";
import { Context } from "grammy";
import { articleModel } from "./article.model";

export const controlButtonModel = async (ctx: Context, clickData: string): Promise<void> => {
  const chatId = getChatId(ctx);

  switch (clickData) {
    case keyboardControls.NEXT.label:
    case keyboardControls.NEXT.value:
      store.getUser(chatId).nextStep();
      break;
    case keyboardControls.PREV.label:
    case keyboardControls.PREV.value:
      store.getUser(chatId).prevStep();
      break;
    case keyboardControls.HUB.label:
    case keyboardControls.HUB.value:
      removeInlineReplyMarkup(ctx);
      onStart(ctx);
      break;
  }
};

export const excursionButtonModel = async (ctx: Context): Promise<void> => {
  removeInlineReplyMarkup(ctx);

  const {data} = await axios.get<IResponse<Image>>(`${getApiURL()}/tabs?type=location`);
  const replyMarkup = createReplyMarkup("inline", data.data ?? []);

  await sendMessage(ctx, {
    message: EXCURSION_REPLY,
    reply_markup: replyMarkup
  });
};

export const articleButtonModel = async (ctx: Context, clickData: string): Promise<void> => {
  // In this model we have to check if the given click data satisfies the article button choice as there
  // was no way to validate it on the previous level (controller) without breaking the MVC model

  const dataAsArticle = await fetchData(clickData, "article") as UserDataContent[];
  const dataAsLocation = await fetchData(clickData, "location") as UserDataContent[];

  if(dataAsLocation.length !== 0 || dataAsArticle.length !== 0) {
    const data = [...dataAsArticle, ...dataAsLocation];
    await articleModel(ctx, data);
    return;
  }

  throw new AxiosError("No data found!");
};

const fetchData = async (clickData: string, articleType: ArticleType): Promise<object[]> => {
  try {
    const { data: response } = await axios.get<IResponse>(`${getApiURL()}/articles?tabValue=${clickData}&type=${articleType}`);
    console.log(response);
    return (response.ok && response.data)
      ? response.data
      : [];
  } catch (response_1) {
    console.log(response_1);
    return [];
  }
};

import { computeArticleData } from "@/adapters/content";
import { imageAdapter } from "@/adapters/images";
import { storeController } from "@/bootstrap";
import { EXCURSION_REPLY } from "@/chat/constants";
import { Pagination } from "@/components/control-flow";
import { IControlFlow } from "@/components/control-flow/types";
import { createReplyMarkup } from "@/components/reply-markup";
import { ContentNode } from "@/types/content";
import { IResponse } from "@/types/server";
import { UserData, UserDataContent } from "@/types/user";
import { getChatId } from "@/utils/common";
import { getApiURL } from "@/utils/server";
import axios from "axios";
import { Context } from "grammy";

export const handleArticleClick = (ctx: Context, locations: object[], controlFlow: IControlFlow) => {
  const chatId = getChatId(ctx);

  const content = (controlFlow instanceof Pagination && locations.length === 1)
    ? computeArticleData(locations[0] as ContentNode)
    : locations;

  const data = formatData(content);

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

const formatData = (locations: object[]): UserData => {
  return {
    content: locations as UserDataContent[],
    step: 0
  };
};

export const openLocationsChoice = async (ctx: Context): Promise<void> => {
  const response = await axios.get<IResponse>(`${getApiURL()}/tabs?type=location`);

  if(!response.data.ok || !response.data.data) {
    throw new Error(response.data.message || "Error fetching data!");
  }

  await ctx.reply(EXCURSION_REPLY, {reply_markup: createReplyMarkup("inline", imageAdapter(response.data.data))});
};

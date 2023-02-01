import { imageAdapter } from "@/adapters/images";
import { EXCURSION_REPLY } from "@/chat/constants";
import { createReplyMarkup } from "@/components/reply-markup";
import { Image } from "@/types/lib";
import { IResponse } from "@/types/server";
import { getApiURL } from "@/utils/server";
import axios from "axios";
import { Context } from "grammy";

// export const handleArticleClick = (ctx: Context, locations: object[], controlFlow: IControlFlow) => {
//   const chatId = getChatId(ctx);

//   const content = (controlFlow instanceof Pagination && locations.length === 1)
//     ? computeArticleData(locations[0] as ContentNode[])
//     : locations;

//   store.addUser(chatId).setContent(content as UserDataContent[]);

//   // Avoiding copy-past
//   function send() {
//     controlFlow.sendData(ctx, chatId);
//   }

//   // Attach the `send` function to give the `storeController` the control over
//   // when a new message must be sent for a concrete user
//   store.getUser(chatId).addChangeStepHandler(send);

//   // First step can't we handled the other way, so we need to call it manually
//   send();
// };

export const openLocationsChoice = async (ctx: Context): Promise<void> => {
  const {data} = await axios.get<IResponse>(`${getApiURL()}/tabs?type=location`);

  if(!data.ok || !data.data) {
    throw new Error(data.message || "Error fetching data!");
  }

  await ctx.reply(EXCURSION_REPLY, {reply_markup: createReplyMarkup("inline", imageAdapter(data.data as Image[]))});
};

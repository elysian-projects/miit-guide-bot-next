import { imageAdapter } from "@/adapters/images";
import { storeController } from "@/bootstrap";
import { EXCURSION_REPLY } from "@/chat/constants";
import { IControlFlow } from "@/components/control-flow/types";
import { createReplyMarkup, removeInlineReplyMarkup } from "@/components/reply-markup";
import { PostgreSQL } from "@/database/postgresql";
import { UserData, UserDataContent } from "@/types/user";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";

export const handleArticleClick = (ctx: Context, locations: object[], controlFlow: IControlFlow) => {
  removeInlineReplyMarkup(ctx);

  const chatId = getChatId(ctx);
  const data = formatData(locations);

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
  const data = await new PostgreSQL().query("SELECT * FROM tabs WHERE tab_type = $1", ["location"]);

  if(data.rowCount === 0) {
    throw new Error("No locations found!");
  }

  await ctx.reply(EXCURSION_REPLY, {reply_markup: createReplyMarkup("inline", imageAdapter(data.rows))});
};

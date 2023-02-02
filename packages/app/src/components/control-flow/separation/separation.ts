import { IControlFlow } from "@/components/control-flow/types";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { ChatId } from "@/types/user";
import { sendMessage, sendPhoto } from "@/views/general.view";
import { Context } from "grammy";
import { checkUserExists, useMessageController } from "../utils";

export class Separation implements IControlFlow {
  public sendData = async (ctx: Context, chatId: ChatId) => {
    removeInlineReplyMarkup(ctx);
    checkUserExists(chatId);

    const { content, props, message } = useMessageController("menu", chatId);

    content.picture
      ? await sendPhoto(ctx, {
        photo: content.picture,
        caption: message,
        ...props
      })
      : await sendMessage(ctx, {
        message,
        ...props
      });
  };
}

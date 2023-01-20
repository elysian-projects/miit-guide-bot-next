import { IControlFlow } from "@/components/control-flow/types";
import { ChatId } from "@/types/user";
import { Context } from "grammy";
import { checkUserExists, useMessageController } from "../utils";

export class Separation implements IControlFlow {
  public sendData = (ctx: Context, chatId: ChatId) => {
    checkUserExists(chatId);

    const { content, props, message } = useMessageController("menu", chatId);

    content.picture
      ? ctx.replyWithPhoto(content.picture, { caption: message, ...props })
      : ctx.reply(message, { ...props });
  };
}

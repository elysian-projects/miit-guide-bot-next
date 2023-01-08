import { IMessageController } from "@/types/controllers";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkIfUserExists, useMessageController } from "./common";

export class Separator implements IMessageController {
  public sendData = (ctx: Context, userId: UserId) => {
    checkIfUserExists(userId);

    const { content, props, message } = useMessageController("menu", userId);

    content.picture
      ? ctx.replyWithPhoto(content.picture, { caption: message, ...props })
      : ctx.reply(message, { ...props });
  };
}

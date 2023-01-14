import { IControlFlow } from "@/components/control-flow/types";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkUserExists, useMessageController } from "../utils";

export class Separation implements IControlFlow {
  public sendData = (ctx: Context, userId: UserId) => {
    checkUserExists(userId);

    const { content, props, message } = useMessageController("menu", userId);

    content.picture
      ? ctx.replyWithPhoto(content.picture, { caption: message, ...props })
      : ctx.reply(message, { ...props });
  };
}

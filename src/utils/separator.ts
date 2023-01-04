import { storeController } from "@/env";
import { IMessageController } from "@/types/controllers";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkIfUserExists, computeMessageProps } from "./common";
import { formatMessage } from "./formatters";

export class Separator implements IMessageController {
  public sendData = (ctx: Context, userId: UserId) => {
    checkIfUserExists(userId);

    const currentContent = storeController.getCurrentContent(userId);
    const message = formatMessage(currentContent);

    const props = computeMessageProps(userId);

    currentContent.picture
            ? ctx.replyWithPhoto(currentContent.picture, {caption: message, ...props})
            : ctx.reply(message, {...props});
  };
}

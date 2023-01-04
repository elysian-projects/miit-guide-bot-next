import { storeController } from "@/env";
import { IMessageController } from "@/types/controllers";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkIfUserExists, computeMessageProps, isFirstStep } from "./common";
import { formatMessage } from "./formatters";

// FIXME: doesn't work
export class Pagination implements IMessageController {
  public sendData = (ctx: Context, userId: UserId) => {
    checkIfUserExists(userId);

    const currentContent = storeController.getCurrentContent(userId);
    const message = formatMessage(currentContent);

    const props = computeMessageProps(userId);

    if(isFirstStep(userId)) {
      currentContent.picture
              ? ctx.replyWithPhoto(currentContent.picture, {caption: message, ...props})
              : ctx.reply(message, {...props});
      return;
    }

    // if(currentContent.picture) {
    //   ctx.editMessageMedia({type: "photo", media: currentContent.picture, caption: message}, {reply_markup: props.reply_markup});
    //   return;
    // }

    ctx.editMessageText(message, {reply_markup: props.reply_markup});
  };
}

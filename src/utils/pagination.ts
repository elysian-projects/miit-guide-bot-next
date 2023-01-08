import { IMessageController } from "@/types/controllers";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkIfUserExists, useMessageController } from "./common";

// FIXME: doesn't work
export class Pagination implements IMessageController {
  public sendData = (ctx: Context, userId: UserId) => {
    checkIfUserExists(userId);

    const {currentContent, message, props, isFirstStep} = useMessageController("inline", userId);

    if(isFirstStep) {
      currentContent.picture
              ? ctx.replyWithPhoto(currentContent.picture, {caption: message, ...props})
              : ctx.reply(message, {...props});
      return;
    }

    if(currentContent.picture) {
      ctx.editMessageMedia({type: "photo", media: currentContent.picture, caption: message}, {reply_markup: props.reply_markup});
      return;
    }

    ctx.editMessageText(message, {reply_markup: props.reply_markup});
  };
}

import { IMessageController } from "@/types/controllers";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkIfUserExists, useMessageController } from "./common";

// FIXME: doesn't work
export class Pagination implements IMessageController {
  public sendData = (ctx: Context, userId: UserId) => {
    checkIfUserExists(userId);

    const { message, props } = useMessageController("inline", userId);

    // if(isFirstStep) {
    //   ctx.reply(message, {...props});
    //   return;
    // currentContent.picture
    //         ? ctx.replyWithPhoto(currentContent.picture, {caption: message, ...props})
    // }


    // if(currentContent.picture) {
    //   ctx.editMessageMedia({type: "photo", media: currentContent.picture, caption: message}, {reply_markup: props.reply_markup});
    //   return;
    // }

    ctx.editMessageText(message, { ...props });
  };
}

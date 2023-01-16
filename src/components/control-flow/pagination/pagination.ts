import { IControlFlow } from "@/components/control-flow/types";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { checkUserExists, useMessageController } from "../utils";
import { PaginationBufferController } from "./bufferController";

// This this is used to control the message to be displayed and edited for different users, and also at the same time
export const paginationBuffer = new PaginationBufferController();

export class Pagination implements IControlFlow {
  public sendData = async (ctx: Context, userId: UserId) => {
    checkUserExists(userId);

    const { content, message, props, isFirstStep } = useMessageController("inline", userId);

    // If the base message is not sent, user won't appear in the buffer so there will be nothing to display
    // and edit in the further steps, so we need this logic to make sure that the `base message` is sent
    if(this.shouldSendBaseMessage(userId, isFirstStep)) {

      // This realization only works when the content photo is provided. To make it work with mixed content,
      // which is half text and half photos, it's easier to rewrite Telegram Bot API rather than try to make it
      // work, so just provide a fucking photo on each step and don't ask questions :)
      const sentMessage = await ctx.api.sendPhoto(userId, content.picture, {caption: message, ...props});

      // The buffer is required to keep track of the users using pagination and their base messages :/
      paginationBuffer.append(userId, sentMessage.message_id);

      return;
    }

    // Record of the user from the pagination buffer to get the base message id
    const record = paginationBuffer.getRecord(userId);

    // Edit message text and photo
    await ctx.api.editMessageMedia(
      userId,
      record.messageId,
      {
        type: "photo",
        caption: message,
        media: content.picture,
        parse_mode: props.parse_mode
      }
    );

    // Edit reply markup (why not just have the `reply_markup` property in the `editMessageMedia` type? fkn Telegram)
    await ctx.api.editMessageReplyMarkup(
      userId,
      record.messageId,
      {
        reply_markup: props.reply_markup
      }
    );
  };

  private shouldSendBaseMessage = (userId: UserId, isFirstMessage: boolean): boolean => {
    return isFirstMessage && !paginationBuffer.userExists(userId);
  };
}

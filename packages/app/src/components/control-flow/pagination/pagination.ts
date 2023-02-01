import { IControlFlow } from "@/components/control-flow/types";
import { ChatId } from "@/types/user";
import { Context } from "grammy";
import { checkUserExists, useMessageController } from "../utils";
import { PaginationBuffer } from "./bufferController";

// This this is used to control the message to be displayed and edited for different users, and also at the same time
export const paginationBuffer = new PaginationBuffer();

export class Pagination implements IControlFlow {
  public sendData = async (ctx: Context, chatId: ChatId) => {
    checkUserExists(chatId);

    if(await this.sendBaseMessage(ctx, chatId)) {
      return;
    }

    await this.editBaseMessage(ctx, chatId);
    await this.editReplyMarkup(ctx, chatId);
  };

  /**
   * Send the base message that must be edited at the next steps
   *
   * @param {Context} ctx - the context provided by the Telegram API
   * @param {ChatId} chatId - the id of the user that the message must be sent to
   * @return {Promise<void>}
   */
  private sendBaseMessage = async (ctx: Context, chatId: ChatId): Promise<boolean> => {
    const { content, message, props, isFirstStep } = useMessageController("inline", chatId);

    // If the base message is not sent, user won't appear in the buffer so there will be nothing to display
    // and edit in the further steps, so we need this logic to make sure that the `base message` is sent
    if(!this.shouldSendBaseMessage(chatId, isFirstStep)) {
      return false;
    }

    // This realization only works when the content photo is provided. To make it work with mixed content,
    // which is half text and half photos, it's easier to rewrite Telegram Bot API rather than try to make it
    // work, so just provide a fucking photo on each step and don't ask questions :)
    const sentMessage = await ctx.api.sendPhoto(chatId, content.picture, {caption: message, ...props});

    paginationBuffer.append(chatId, sentMessage.message_id);

    return true;
  };

  /**
   * Edits the base message with the updated content
   *
   * @param {Context} ctx - the context provided by the Telegram API
   * @param {ChatId} chatId - the id of the user that the message must be sent to
   * @return {Promise<void>}
   */
  private editBaseMessage = async (ctx: Context, chatId: ChatId): Promise<void> => {
    const { messageId } = paginationBuffer.getRecord(chatId);
    const { content, message, props } = useMessageController("inline", chatId);

    await ctx.api.editMessageMedia(
      chatId,
      messageId,
      {
        type: "photo",
        caption: message,
        media: content.picture,
        parse_mode: props.parse_mode
      }
    );
  };

  /**
   * Edits the base message reply markup
   *
   * @param {Context} ctx - the context provided by the Telegram API
   * @param {ChatId} chatId - the id of the user that the message must be sent to
   * @return {Promise<void>}
   */
  private editReplyMarkup = async (ctx: Context, chatId: ChatId): Promise<void> => {
    const { messageId } = paginationBuffer.getRecord(chatId);
    const { props } = useMessageController("inline", chatId);

    await ctx.api.editMessageReplyMarkup(
      chatId,
      messageId,
      {
        reply_markup: props.reply_markup
      }
    );
  };

  private shouldSendBaseMessage = (userId: ChatId, isFirstMessage: boolean): boolean => {
    return isFirstMessage && !paginationBuffer.userExists(userId);
  };
}

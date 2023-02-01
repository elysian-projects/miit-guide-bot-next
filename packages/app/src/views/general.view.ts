import { AvailableKeyboardTypes } from "@/types/lib";
import { Context } from "grammy";
import { MessageEntity, ParseMode } from "grammy/out/types.node";

interface ChatOptions {
  reply_markup?: AvailableKeyboardTypes,
  allow_sending_without_reply?: boolean,
  disable_notification?: boolean,
  disable_web_page_preview?: boolean,
  entities?: MessageEntity[],
  message_thread_id?: number,
  parse_mode?: ParseMode,
  protect_content?: boolean,
  reply_to_message_id?: number
}

interface SendMessageOptions extends ChatOptions {
  message: string,
}

interface SendPhotoOptions extends ChatOptions {
  photo: string,
  caption?: string,
}

export const sendMessage = async (ctx: Context, options: SendMessageOptions) => {
  const {message, ...props} = options;
  await ctx.reply(message, props);
};


export const sendPhoto = async (ctx: Context, options: SendPhotoOptions) => {
  const {photo, ...props} = options;
  await ctx.replyWithPhoto(photo, props);
};

import { ControlButtons, MessageHandler } from "@/types/lib";
import { takeControlButtonAction } from "@/utils/common";

export const controlButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const userId = ctx.chat?.id;
  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!userId || !buttonData) {
    throw new Error("Invalid context");
  }

  takeControlButtonAction(ctx, buttonData as ControlButtons, userId);
};

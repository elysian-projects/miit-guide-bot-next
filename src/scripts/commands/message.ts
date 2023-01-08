import { UNKNOWN_COMMAND } from "@/constants/replies";
import { ControlButtons, MessageHandler } from "@/types/lib";
import { takeControlButtonAction } from "@/utils/common";
import { isValidControlButton } from "@/validations/state";

export const messageHandler: MessageHandler = (ctx) => {
  const userId = ctx.chat?.id;
  const messageData = ctx.message?.text;

  // TODO: move this to an external method
  if(!userId || !messageData) {
    throw new Error("Invalid data");
  }

  if(isValidControlButton(messageData)) {
    takeControlButtonAction(ctx, messageData as ControlButtons, userId);
    return;
  }

  ctx.reply(UNKNOWN_COMMAND);
};

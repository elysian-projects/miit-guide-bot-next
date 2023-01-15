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

    const { message, props, isFirstStep } = useMessageController("inline", userId);

    if(isFirstStep && !this.isBaseMessageSent(userId)) {
      const sentMessage = await ctx.api.sendMessage(userId, message, {...props});
      paginationBuffer.append(userId, sentMessage.message_id);

      return;
    }

    const userRecord = paginationBuffer.getRecord(userId);

    if(userRecord) {
      await ctx.api.editMessageText(userId, userRecord.messageId, message, props);
    }
  };

  public isBaseMessageSent = (userId: UserId): boolean => {
    return paginationBuffer.userExists(userId);
  };
}

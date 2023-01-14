import { paginationStack } from "@/components/control-flow/pagination/pagination";
import { ControlButtons, KeyboardButtons, removeInlineKeyboard } from "@/components/reply-markup";
import { storeController } from "@/env";
import { start } from "@/scripts/commands";
import { Tab, TabsList } from "@/types/tabs";
import { UserId } from "@/types/user";
import { Context } from "grammy";
import { getTabData } from "./data";

/**
 * Returns array of values reached with the given key as prop
 *
 * @example
 * ```typescript
 * const array = [
 *    {value1: "1", value2: "2"},
 *    {value1: "3", value2: "4"}
 * ];
 * const values = getObjectPropArray(array, "value1"); // ["1", "3"]
 * ```
 *
 * @param {T[]} objectList - array of objects
 * @param {K} prop - the key to extract values with
 * @returns {T[K][]} array of values
 */
export const getObjectPropArray = <T extends object, K extends keyof T>(objectList: T[], prop: K): T[K][] => {
  return Object.values(objectList).map(object => object[prop]) ?? [];
};

export const takeControlButtonAction = (ctx: Context, button: ControlButtons, userId: UserId) => {
  switch (button) {
    case ControlButtons.NEXT:
    case KeyboardButtons.NEXT.label:
      storeController.getUser(userId).nextStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.PREV:
    case KeyboardButtons.PREV.label:
      storeController.getUser(userId).prevStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.HUB:
    case KeyboardButtons.HUB.label:
      // TODO: find a closer place to pagination module to remove user from the stack
      // Remove user from the stack
      paginationStack.removeUser(userId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};

type TabProps = {
  userId: UserId,
  tabData: Tab
}
export const computeTabProps = (ctx: Context, tabName: TabsList): TabProps => {
  // This definitely should NOT throw an exception but invalid context is the Telegram API
  // issue, so if this exception is thrown, there is a problem with Telegram and there must
  // be a better way to handle it rather than just throwing an exception
  if (!ctx.chat || !ctx.chat.id) {
    throw new Error("Invalid context!");
  }

  const userId = ctx.chat.id;
  const tabData = getTabData(tabName);

  return {
    userId,
    tabData
  };
};
import { keyboardControls, locationButton } from "@/constants/controls";
import { articleButtonModel, controlButtonModel, excursionButtonModel } from "@/models/keyboard.model";
import { extractFromImages } from "@/utils/image";
import { Context } from "grammy";

/**
 * Main controller-router for keyboard buttons. It defines the keyboard type and calls the needed model
 *
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
export const onKeyboardClick = async (ctx: Context): Promise<void> => {
  const clickData = getClickData(ctx);

  if(isControlButton(clickData)) {
    await controlButtonModel(ctx, clickData);
    return;
  }

  if(isExcursionButton(clickData)) {
    await excursionButtonModel(ctx);
    return;
  }

  // There is no way to check if the clicked button is an article button without sending queries
  // to the server, so we delegate this check to the model level not to break the MVC structure
  await articleButtonModel(ctx, clickData);
};

/**
 * Returns true if the given
 */
const isControlButton = (clickData: string): boolean => {
  return [
    // We also have to check label value because the clicked button might be a menu-keyboard button
    ...extractFromImages(Object.values(keyboardControls), "label"),
    ...extractFromImages(Object.values(keyboardControls), "value")
  ].includes(clickData);
};

const isExcursionButton = (clickData: string): boolean => {
  return [locationButton.value, locationButton.label].includes(clickData);
};

const getClickData = (ctx: Context): string => {
  // The keyboard click might be triggered from the inline or menu keyboards
  const clickData = ctx.callbackQuery?.data ?? ctx.msg?.text;

  if(!clickData) {
    throw new Error("Invalid context, could not find the keyboard click data!");
  }

  return clickData;
};

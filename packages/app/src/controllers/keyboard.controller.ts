import { store } from "@/bootstrap";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { keyboardControls, locationButton } from "@/constants/controls";
import { handleArticleButtonClick, handleControlButtonClick, handleExcursionButtonClick } from "@/models/keyboard.model";
import { getChatId } from "@/utils/common";
import { extractFromImages } from "@/utils/image";
import { sendMessage } from "@/views/general.view";
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
    onControlButtonClick(ctx, clickData);
  }
  else if(isExcursionButton(clickData)) {
    await onExcursionButtonClick(ctx);
  }
  else {
    // There is no way to check if the clicked button is an article button without sending queries
    // to the server, so we delegate this check to the model level not to break the MVC structure
    await onArticleButtonClick(ctx, clickData);
  }
};

const onControlButtonClick = (ctx: Context, clickData: string): void => {
  const {onFinish, shouldRemoveKeyboard} = handleControlButtonClick(ctx, clickData, store.getUser(getChatId(ctx)));

  if(shouldRemoveKeyboard) {
    removeInlineReplyMarkup(ctx);
  }

  onFinish();
};

const onExcursionButtonClick = async (ctx: Context): Promise<void> => {
  removeInlineReplyMarkup(ctx);

  const {message, replyMarkup} = await handleExcursionButtonClick();

  await sendMessage(ctx, {
    message: message,
    reply_markup: replyMarkup
  });
};

const onArticleButtonClick = async (ctx: Context, clickData: string): Promise<void> => {
  const chatId = getChatId(ctx);
  const {controlFlow, data} = await handleArticleButtonClick(clickData);

  const changeStepHandler = () => {
    controlFlow.sendData(ctx, chatId);
  };

  store.addUser(chatId).setContent(data);
  store.getUser(chatId).addChangeStepHandler(changeStepHandler);

  changeStepHandler();
};

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

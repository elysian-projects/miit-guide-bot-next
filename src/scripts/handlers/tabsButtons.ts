import { tabsData } from "@/env";
import { ButtonClickHandler } from "@/types/mixins";
import { TabsList } from "@/types/tabs";
import { removeInlineKeyboard } from "@/utils/keyboard";

export const tabsButtonClickHandler: ButtonClickHandler = async ({ctx, clickData}) => {
  tabsData[clickData as TabsList].onClick(ctx);
  removeInlineKeyboard(ctx);
};

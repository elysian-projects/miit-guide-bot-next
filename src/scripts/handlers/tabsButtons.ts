import { removeInlineKeyboard } from "@/components/reply-markup";
import { tabsData } from "@/env";
import { TabsList } from "@/external/tabs";
import { ButtonClickHandler } from "@/types/mixins";

export const tabsButtonClickHandler: ButtonClickHandler = async ({ctx, clickData}) => {
  tabsData[clickData as TabsList].onClick(ctx);
  removeInlineKeyboard(ctx);
};

import { ButtonsList } from "@/components/reply-markup";
import { ButtonClickHandler } from "@/types/mixins";
import { takeControlButtonAction } from "@/utils/common";

export const controlButtonClickHandler: ButtonClickHandler = async ({ctx, userId, clickData}) => {
  takeControlButtonAction(ctx, clickData as ButtonsList, userId);
};

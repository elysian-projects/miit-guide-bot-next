import { ControlButtons } from "@/types/lib";
import { ButtonClickHandler } from "@/types/mixins";
import { takeControlButtonAction } from "@/utils/common";

export const controlButtonClickHandler: ButtonClickHandler = async ({ctx, userId, clickData}) => {
  takeControlButtonAction(ctx, clickData as ControlButtons, userId);
};

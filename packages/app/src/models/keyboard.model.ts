import { IControlFlow } from "@/components/control-flow/types";
import { createReplyMarkup } from "@/components/reply-markup";
import { keyboardControls } from "@/constants/controls";
import { EXCURSION_REPLY } from "@/constants/messages";
import { onStart } from "@/controllers/commands.controller";
import { User } from "@/entities/user";
import { AvailableKeyboardTypes, Image } from "@/types/lib";
import { AxiosError } from "axios";
import { ContentNode, getData } from "common/dist";
import { Context } from "grammy";
import { getChatControlFlow } from "./article.model";

export const handleControlButtonClick = (ctx: Context, clickData: string, user: User): {shouldRemoveKeyboard: boolean, onFinish: () => void} => {
  switch (clickData) {
    case keyboardControls.NEXT.label:
    case keyboardControls.NEXT.value:
      return {
        shouldRemoveKeyboard: false,
        onFinish: () => user.nextStep()
      };
    case keyboardControls.PREV.label:
    case keyboardControls.PREV.value:
      return {
        shouldRemoveKeyboard: false,
        onFinish: () => user.prevStep()
      };
    case keyboardControls.HUB.label:
    case keyboardControls.HUB.value:
      return {
        shouldRemoveKeyboard: true,
        onFinish: () => onStart(ctx)
      };
  }

  return {
    shouldRemoveKeyboard: false,
    onFinish: () => 0,
  };
};

export const handleExcursionButtonClick = async (): Promise<{message: string, replyMarkup: AvailableKeyboardTypes}> => {
  const response = await getData("tabs", {where: {type: "location"}});

  const data = (response.ok && response.data)
    ? response.data as Image[]
    : [];

  const replyMarkup = createReplyMarkup("inline", data);

  return {
    message: EXCURSION_REPLY,
    replyMarkup
  };
};

export const handleArticleButtonClick = async (clickData: string): Promise<{controlFlow: IControlFlow, data: ContentNode[]}> => {
  // In this model we have to check if the given click data satisfies the article button choice as there
  // was no way to validate it on the previous level (controller) without breaking the MVC model

  const data = await fetchData(clickData) as ContentNode[];

  if(data.length !== 0) {
    const controlFlow = getChatControlFlow();

    return {
      data,
      controlFlow
    };
  }

  throw new AxiosError("No data found!");
};

const fetchData = async (clickData: string): Promise<object[]> => {
  try {
    const response = await getData("articles", {where: {tabValue: clickData}, orderBy: "order.asc"});

    return (response.ok && response.data)
      ? response.data
      : [];
  } catch {
    return [];
  }
};

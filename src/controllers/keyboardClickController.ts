import { keyboardControls } from "@/chat/controls";
import { locationButton } from "@/chat/images";
import { Pagination, Separation } from "@/components/control-flow";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { PostgreSQL } from "@/database/postgresql";
import { handleArticleClick, openLocationsChoice } from "@/handlers/articles";
import { handleControlButtonClick } from "@/handlers/controls";
import { ArticleType } from "@/types/content";
import { extractFromImages } from "@/utils/image";
import { Context } from "grammy";

/** Head router that determines the type of the clicked button and calls its controller */
export const keyboardClickRouter = async (ctx: Context) => {
  const clickData = getClickData(ctx);

  // Check if the clicked button is a control button
  if(extractFromImages(Object.values(keyboardControls), "value").includes(clickData)
  || extractFromImages(Object.values(keyboardControls), "label").includes(clickData)) {
    handleControlButtonClick(ctx, clickData);
    return;
  }

  // The clicked button is the location choice button
  if(locationButton.value === clickData || locationButton.label === clickData) {
    removeInlineReplyMarkup(ctx);
    openLocationsChoice(ctx);
    return;
  }

  // Button of type `location`
  const location = await matchButtonType(clickData, "location");
  if(location.found && location.data) {
    removeInlineReplyMarkup(ctx);
    handleArticleClick(ctx, location.data, new Separation());
    return;
  }

  // Button of type `article`
  const article = await matchButtonType(clickData, "article");
  if(article.found && article.data) {
    removeInlineReplyMarkup(ctx);
    handleArticleClick(ctx, article.data, new Pagination());
    return;
  }
};

type Response = {
  found: boolean,
  data: object[] | null
}
const matchButtonType = async (clickData: string, type: ArticleType): Promise<Response> => {
  const data = await new PostgreSQL().query("SELECT * FROM articles WHERE (label = $1 OR _value = $1) AND _type = $2", [clickData, type]);

  return (data.rowCount !== 0)
    ? {
      found: true,
      data: data.rows
    } : {
      found: false,
      data: null
    };
};

const getClickData = (ctx: Context): string => {
  // The keyboard click might be triggered from the inline or menu keyboards
  const clickData = ctx.callbackQuery?.data ?? ctx.msg?.text;

  // If no click data is provided, the controller is called in the wrong place/order, so we need to know that
  if(!clickData) {
    throw new Error("Invalid context, could not find the keyboard click data!");
  }

  return clickData;
};

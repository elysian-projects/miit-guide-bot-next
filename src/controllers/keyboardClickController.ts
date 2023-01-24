import { keyboardControls } from "@/chat/controls";
import { locationButton } from "@/chat/images";
import { Pagination, Separation } from "@/components/control-flow";
import { PostgreSQL } from "@/database/postgresql";
import { handleControlButtonClick } from "@/handlers/controls";
import { handleArticleClick, openLocationsChoice } from "@/handlers/locations";
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
    openLocationsChoice(ctx);
    return;
  }

  // Button of type `location`
  await matchButtonType(ctx, clickData, "location", (ctx, data) => handleArticleClick(ctx, data, new Separation()));

  // Button of type `article`
  await matchButtonType(ctx, clickData, "article", (ctx, data) => handleArticleClick(ctx, data, new Pagination()));
};

const matchButtonType = async (ctx: Context, clickData: string, type: ArticleType, handler: (ctx: Context, data: object[]) => void): Promise<void> => {
  const data = await new PostgreSQL().query("SELECT * FROM articles WHERE (label = $1 OR _value = $1) AND _type = $2", [clickData, type]);

  if(data.rowCount !== 0) {
    handler(ctx, data.rows);
  }
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

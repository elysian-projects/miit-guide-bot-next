import { keyboardControls } from "@/chat/controls";
import { locationButton } from "@/chat/images";
import { handleArticleClick } from "@/handlers/articles";
import { handleControlButtonClick } from "@/handlers/controls";
import { handleLocationClick, openLocationsChoice } from "@/handlers/locations";
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
  if(await matchButtonType(clickData, "location")) {
    handleLocationClick(ctx, clickData);
    return;
  }

  // Button of type `article`
  if(await matchButtonType(clickData, "article")) {
    handleArticleClick(ctx, clickData);
    return;
  }

  // The router was called but the clicked button is not valid
  throw new Error("Invalid inline button!");
};

// TODO: rewrite when server is ready
const matchButtonType = async (clickData: string, type: ArticleType): Promise<boolean> => {
  // const database = new PostgreSQL();
  // const data = await database.query("SELECT * FROM articles WHERE `title` = $1::title AND type = $2::text", [clickData, type]);

  // return data.fields.length !== 0;

  if(type === "article") {
    return ["МИИТ в годы ВОВ", "ww2"].includes(clickData);
  } else {
    return ["Улица", "street", "Корпус 1", "building1"].includes(clickData);
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

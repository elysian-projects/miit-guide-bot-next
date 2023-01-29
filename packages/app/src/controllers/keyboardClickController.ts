import { keyboardControls } from "@/chat/controls";
import { locationButton } from "@/chat/images";
import { Pagination, Separation } from "@/components/control-flow";
import { IControlFlow } from "@/components/control-flow/types";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { handleArticleClick, openLocationsChoice } from "@/handlers/articles";
import { handleControlButtonClick } from "@/handlers/controls";
import { ArticleType } from "@/types/content";
import { IResponse } from "@/types/server";
import { extractFromImages } from "@/utils/image";
import { getApiURL } from "@/utils/server";
import axios from "axios";
import { Context } from "grammy";

type ResponseType = {
  found: boolean,
  data: object[] | null
}

export class KeyboardRouter {
  /**
   * Main router redirection method
   *
   * @async
   * @param {Context} ctx context provided by the Telegram API
   */
  public redirect = async (ctx: Context): Promise<void> => {
    const clickData = this.getClickData(ctx);

    // Check if the clicked button is a control button
    this.handleControlButton(ctx, clickData) ||

    // The clicked button is the location choice button
    this.handleLocationMenuButton(ctx, clickData) ||

    // Button of type `location`
    await this.handleLocationChoiceButton(ctx, clickData, "location");

    // Button of type `article`
    await this.handleLocationChoiceButton(ctx, clickData, "article");
  };

  /**
   * Control button click handler
   *
   * @param {Context} ctx context provided by the Telegram API
   * @param {string} clickData value of the clicked button
   * @returns {boolean}
   */
  private handleControlButton = (ctx: Context, clickData: string): boolean => {
    if(extractFromImages(Object.values(keyboardControls), "value").includes(clickData)
    || extractFromImages(Object.values(keyboardControls), "label").includes(clickData)) {
      handleControlButtonClick(ctx, clickData);
      return true;
    }

    return false;
  };

  /**
   * Location choice button click handler
   *
   * @param {Context} ctx context provided by the Telegram API
   * @param {string} clickData value of the clicked button
   * @returns {boolean}
   */
  private handleLocationMenuButton = (ctx: Context, clickData: string): boolean => {
    if(locationButton.value === clickData || locationButton.label === clickData) {
      removeInlineReplyMarkup(ctx);
      openLocationsChoice(ctx);
      return true;
    }

    return false;
  };

  /**
   * Location choice button click handler
   *
   * @async
   * @param {Context} ctx context provided by the Telegram API
   * @param {string} clickData value of the clicked button
   * @param {ArticleType} articleType type of the article from the database
   * @returns {boolean}
   */
  private handleLocationChoiceButton = async (ctx: Context, clickData: string, articleType: ArticleType): Promise<boolean> => {
    const location = await this.matchButtonType(clickData, articleType);

    if(location.found && location.data) {
      removeInlineReplyMarkup(ctx);
      handleArticleClick(ctx, location.data, this.getControlFlowType(articleType));
      return true;
    }

    return false;
  };

  /**
   * Returns the control flow object depending on the article type
   *
   * @param {ArticleType} articleType type of the article from the database
   * @returns {IControlFlow}
   */
  private getControlFlowType = (articleType: ArticleType): IControlFlow => {
    return (articleType === "location")
      ? new Separation()
      : new Pagination();
  };

  /**
   * Send request to the database and returns the found data if it exists
   *
   * @async
   * @param {string} clickData clicked button value
   * @param {ArticleType} articleType type of the article from the database
   * @returns {Promise<ResponseType>}
   */
  private matchButtonType = async (clickData: string, articleType: ArticleType): Promise<ResponseType> => {
    const {data: responseWithLabel} = await axios.get<IResponse>(`${getApiURL()}/articles?label=${clickData}&type=${articleType}`);
    const {data: responseWithValue} = await axios.get<IResponse>(`${getApiURL()}/articles?value=${clickData}&type=${articleType}`);

    const data = responseWithValue.data ?? responseWithLabel.data ?? [];

    return (data.length !== 0)
      ? {
        found: true,
        data
      } : {
        found: false,
        data: null
      };
  };

  /**
   * Extracts clicked button value from the given context, or throws an error if the context is invalid
   *
   * @param {Context} ctx context provided by the Telegram API
   * @returns {string}
   */
  private getClickData = (ctx: Context): string => {
    // The keyboard click might be triggered from the inline or menu keyboards
    const clickData = ctx.callbackQuery?.data ?? ctx.msg?.text;

    if(!clickData) {
      throw new Error("Invalid context, could not find the keyboard click data!");
    }

    return clickData;
  };
}

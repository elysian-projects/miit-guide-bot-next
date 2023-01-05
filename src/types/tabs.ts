import { Context } from "grammy";
import { Image, Representable } from "./common";
import { ContentNode, WithReplyMarkup } from "./content";

export type TabsList = "excursion" | "ww2";

export interface Tab extends ContentNode, WithReplyMarkup {
  icon?: string,
  onClick: (ctx: Context) => void
}

export type Tabs = Representable<TabsList, Tab>;

export type TabImage = Image<TabsList>;

import { Image } from "@/types/common";
import { ContentNode, WithReplyMarkup } from "@/types/content";
import { Context } from "grammy";

/** Tab inner names for convenience */
export type TabsList = "excursion" | "ww2";

/** Represents a tab, which is shown in the hub, data */
export interface Tab extends ContentNode, WithReplyMarkup {
  icon?: string,
  onClick: (ctx: Context) => void
}

/**
 * Represents a tab which is an imaginable object
 * @see `@/types/common/Image`
 */
export type TabImage = Image<TabsList>;

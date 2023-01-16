import { Image } from "@/types/common";
import { WithReplyMarkup } from "@/types/content";

/** Tab inner names for convenience */
export type TabsList = "excursion" | "ww2";

/** Represents a tab, which is shown in the hub, data */
// export interface Tab extends ContentNode, WithReplyMarkup {
//   icon?: string,
//   // onClick: (ctx: Context) => void
// }
export interface Tab extends Image, WithReplyMarkup {
  content: string
}

/**
 * Represents a tab which is an imaginable object
 * @see `@/types/common/Image`
 */
export type TabImage = Image<TabsList>;

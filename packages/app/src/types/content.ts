import { AvailableKeyboardTypes } from "./lib";
import { FlatContent, RichContent } from "./user";

export interface WithPicture {
  /** Path to picture to be send with the node */
  picture: string,
}

export interface WithLinks {
  /** URL links to external sources  */
  links: string[]
}

export interface WithReplyMarkup {
  replyMarkup: AvailableKeyboardTypes
}

/**
 * Type of the record from the database
 */
export type ArticleType = "article" | "location";

/**
 * Node that contains a piece of the whole information (might be a part of an article or a memorial article)
 */
export interface ContentNode<T extends RichContent | FlatContent = RichContent> {
  /** Value of the parent record */
  tabValue: string,
  /** Public label of the current node */
  label: string,
  /** Value for tracking state in the system */
  value: string,
  /** Rich content that includes main information on the node */
  content: T,
  /** Type of the record */
  type: ArticleType
}

import { InlineKeyboard, Keyboard } from "grammy";

/**
 * Modes of how the content is shown to the user: `SEPARATED` - in different messages, `PAGES` - with one message but shown as a book
 */
export enum ShowMode {
  SEPARATE,
  PAGED
}

export interface WithPicture<T extends string = string> {
  /** Path to picture to be send with the node */
  picture?: T,
}

export interface WithLinks<T extends string = string> {
  /** URL links to external sources  */
  links?: T[]
}

export interface WithReplyMarkup<T extends InlineKeyboard | Keyboard = InlineKeyboard> {
  replyMarkup: T
}

/**
 * Node that contains a piece of the whole information (might be a part of an article or a memorial article)
 */
export interface ContentNode {
  /** Public label of the current node */
  label: string,
  /** Rich content that includes main information on the node */
  content: string,
}

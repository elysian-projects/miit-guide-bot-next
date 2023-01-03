/**
 * Modes of how the content is shown to the user: `SEPARATED` - in different messages, `PAGES` - with one message but shown as a book
 */
export enum ShowMode {
  SEPARATE,
  PAGED
}

/**
 * Node that contains a piece of the whole information (might be a part of an article or a memorial article)
 */
export interface Content {
  /** Public title of the current node, must be shown as a title of the message */
  title: string,
  /** Rich content that includes main information on the node */
  information: string,
  /** Path to picture to be send with the node */
  picture?: string,
  /** URL links to external sources  */
  links?: string[]
}

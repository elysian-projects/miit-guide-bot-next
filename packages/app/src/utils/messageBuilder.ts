import { ParseMode } from "grammy/out/types";

/**
 * Helps to create a complex message and work with it in a declarative way
 */
export class MessageBuilder {
  private _message: string;

  constructor() {
    this._message = "";
  }

  /**
   * Returns built message
   *
   * @returns {string} built message
   */
  public get message(): string {
    return this._message;
  }

  /**
   * Appends the given text to the end of the message (in the same line) and optionally surrounds
   * it with an edging, which is helpful when creating e.g. a *bold* text in markdown
   *
   * @example
   *
   * ```typescript
   * const messageBuilder = new MessageBuilder();
   *
   * messageBuilder.append("Hello"); // "Hello"
   * messageBuilder.append(" World!"); // "Hello World!"
   * ```
   *
   * @param {string} text - the text to append
   * @param {string} edging - string to surround with text with
   * @returns {MessageBuilder} this
   */
  public append = (text: string, edging = ""): this => {
    this._message += (edging + text + edging);
    return this;
  };

  /**
   * Like `append`, but adds the given text to a new line if the message is not empty
   *
   * @example
   *
   * ```typescript
   * const messageBuilder = new MessageBuilder();
   *
   * messageBuilder.appendLine("Hello"); // "Hello"
   * messageBuilder.appendLine("World!"); // "Hello\nWorld!"
   * ```
   *
   * @param {string} text - the text to append
   * @param {string} edging - string to surround with text with
   * @returns {MessageBuilder} this
   */
  public appendLine = (text: string, edging = ""): this => {
    if(this._message.length !== 0) {
      this.appendEmptyLine();
    }

    this.append(text, edging);

    return this;
  };

  /**
   * Always adds an empty line to the end of the message (even if the message is empty)
   *
   * @example
   *
   * ```typescript
   * const messageBuilder = new MessageBuilder();
   *
   * messageBuilder.append("Hello"); // "Hello"
   *
   * // This is what `appendLine` actually does, but unlike `appendLine`
   * // this method will add new line even if the message is empty
   * messageBuilder.appendEmptyLine();
   * messageBuilder.append("World!"); // "Hello\nWorld!"
   * ```
   *
   * @returns {MessageBuilder} this
   */
  public appendEmptyLine = (): this => {
    this._message += "\n";
    return this;
  };
}

export class TextDecorator {
  public static getBoldText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? `*${text}*`
      : `<b>${text}</b>`;
  };

  public static getItalicText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? `*${text}*`
      : `<i>${text}</i>`;
  };

  public static getStrikeText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? `~~${text}~~`
      : `<s>${text}</s>`;
  };

  /**
   * @note - `underline` doesn't work in Markdown
   */
  public static getUnderlineText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? text
      : `<u>${text}</u>`;
  };

  public static getCodeText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? `\`${text}\``
      : `<code>${text}</code>`;
  };

  /**
   * @note - `pre` doesn't work in Markdown
   */
  public static getPreText = (text: string, parseMode: ParseMode): string => {
    return (parseMode === "Markdown")
      ? TextDecorator.getCodeText(text, "Markdown")
      : `<pre>${text}</pre>`;
  };
}

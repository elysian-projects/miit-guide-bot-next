import { InlineKeyboardButton, KeyboardButton } from "telegraf/typings/core/types/typegram";

// A bunch of types stolen from the source code of the library, as they are
// not exported but need to be used to create buttons and markups.
export type Hideable<B> = B & { hide?: boolean }
export type HideableKBtn = Hideable<KeyboardButton>
export type HideableIKBtn = Hideable<InlineKeyboardButton>

export type ButtonCreatorOptions = {
  resize?: boolean,
  columns?: number
}

export type InlineButtonImage = {
  label: string,
  value: string
}

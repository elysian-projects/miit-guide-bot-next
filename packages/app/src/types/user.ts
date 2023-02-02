import { Content } from "@/components/content";
import { User } from "@/entities/user";
import { ContentNode, WithLinks, WithPicture } from "./content";

/**
 * Chat id type, provided by Telegram API
 */
export type ChatId = number;

export type RichContent = string[];
export type FlatContent = string;

/**
 * Represents a content node on each step of an article or excursion
 */
export type UserDataContent<T extends RichContent | FlatContent = RichContent> = ContentNode<T> & WithPicture & Partial<WithLinks>

export interface UserState {
  /** Chat id, provided by Telegram API through context */
  readonly id: ChatId,
  /** Array with content nodes to be shown to user on each step */
  content: Content,
  /** Current content step, that represents index of the active content node. Default value is `0` */
  step: number
}

export type StepInformation = {
  currentStep: number,
  maxSteps: number
}

/** A decorator used to add interfaces to the static classes */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor;};
}

export type StorageState = Record<ChatId, User>;

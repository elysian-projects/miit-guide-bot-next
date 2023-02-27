import { Content } from "@/components/content";
import { User } from "@/entities/user";

/**
 * Chat id type, provided by Telegram API
 */
export type ChatId = number;

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
  maxSteps: number,
  isLastArticleNode: boolean
}

/** A decorator used to add interfaces to the static classes */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor;};
}

export type StorageState = Record<ChatId, User>;

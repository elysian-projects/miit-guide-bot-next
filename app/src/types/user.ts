import { User } from "@/controllers/userController";
import { ContentNode, WithLinks, WithPicture } from "./content";

/**
 * Chat id type, provided by Telegram API
 */
export type ChatId = number;

/**
 * Represents a content node on each step of an article or excursion
 */
export type UserDataContent = ContentNode & WithPicture & Partial<WithLinks>

/**
 * Object that represents data payload, that contains information to be shown on steps
 */
export interface UserData {
  /** Array with content nodes to be shown to user on each step */
  content: UserDataContent[],
  /** Current step, that represents index of the active content node. Default value is `0`. This value must not be changed manually */
  step: number,
}

export interface UserState {
  /** Chat id, provided by Telegram API through context */
  readonly id: ChatId,
  /** Data to be shown to a user */
  data: UserData
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
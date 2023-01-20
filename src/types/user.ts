import { User } from "@/controllers/userController";
import { ContentNode, WithLinks, WithPicture } from "./content";
import { Image } from "./lib";

/**
 * Chat id type, provided by Telegram API
 */
export type ChatId = number;

/**
 * Status that represents what tab is currently active.
 * This enum should be updated when new tabs are added to the application.
 */
// TODO: remove asap
// export enum UserStatus {
//   MAIN_HUB,
//   EXCURSION_HUB,
//   MIIT_WAR_HUB,
//   IN_PROCESS
// }

export type UserDataContent = ContentNode & WithPicture & Partial<WithLinks>

/**
 * Object that represents data payload, that contains information to be shown on steps
 */
export interface UserData {
  /** Public title of chosen activity */
  title: string,
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

// Tabs in the main menu
export type TabValues = "locations" | "ww2";
export type TabImage = Image<TabValues>;

export type StepInformation = {
  currentStep: number,
  maxSteps: number
}

/** A decorator used to add interfaces to the static classes */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor;};
}

export type StorageState = Record<ChatId, User>;

import { ContentNode, WithLinks, WithPicture } from "./content";

/**
 * Chat id type, provided by Telegram API
 */
export type UserId = number;

/**
 * Status that represents what tab is currently active.
 * This enum should be updated when new tabs are added to the application.
 */
export enum UserStatus {
  MAIN_HUB,
  EXCURSION_HUB,
  MIIT_WAR_HUB,
  IN_PROCESS
}

export type UserDataContent = ContentNode & Partial<WithPicture> & Partial<WithLinks>

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
  readonly id: UserId,
  /** Current user active screen */
  status: UserStatus,
  /** Data to be shown to a user */
  data: UserData
}

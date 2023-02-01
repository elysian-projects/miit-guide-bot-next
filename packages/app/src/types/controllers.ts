import { ChatId, UserDataContent } from "./user";

export type EventHandler = () => void;

export interface IUser {
  id: () => ChatId,
  // getData: () => UserData,
  setContent: (data: UserDataContent[]) => void,
  getCurrentContent: () => UserDataContent,
  getCurrentInnerStep: () => number,
  getAmountOfInnerContent: () => number,
  addChangeStepHandler: (handler: EventHandler) => void,
  nextStep: () => void,
  prevStep: () => void,
  isFirstStep: () => boolean,
  isLastStep: () => boolean,
}

export interface IStore {
  addUser: (chatId: ChatId) => IUser,
  userExists: (chatId: ChatId) => boolean,
  /** Returns a MUTABLE user object */
  getUser: (chatId: ChatId) => IUser,
  removeUser: (chatId: ChatId) => boolean,
}

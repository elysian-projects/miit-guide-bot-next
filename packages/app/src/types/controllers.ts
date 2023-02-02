import { ChatId, FlatContent, UserDataContent } from "./user";

export type EventHandler = () => void;

export interface IUser {
  id: () => ChatId,
  setContent: (data: UserDataContent[]) => void,
  getCurrentContent: () => UserDataContent<FlatContent>,
  getCurrentStep: () => number,
  getAmountOfContent: () => number,
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

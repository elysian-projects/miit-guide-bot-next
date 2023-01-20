import { ChatId, UserData, UserDataContent } from "./user";

export type EventHandler = () => void;

export interface IUser {
  id: () => ChatId,
  getData: () => UserData,
  setData: (data: UserData) => void,
  getCurrentContent: () => UserDataContent,
  addChangeStepHandler: (handler: EventHandler) => void,
  nextStep: () => void,
  prevStep: () => void,
  isFirstStep: () => boolean,
  isLastStep: () => boolean,
}

export interface IStoreController {
  addUser: (chatId: ChatId, data: UserData) => IUser,
  userExists: (chatId: ChatId) => boolean,
  /** Returns a MUTABLE user object */
  getUser: (chatId: ChatId) => IUser,
  removeUser: (chatId: ChatId) => boolean,
}

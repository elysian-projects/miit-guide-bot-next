import { EventHandler } from "./common";
import { UserData, UserDataContent, UserId, UserStatus } from "./user";

export interface IUser {
  id: () => UserId,
  getStatus: () => UserStatus,
  setStatus: (status: UserStatus) => void,
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
  addUser: (userId: UserId, data: UserData) => void,
  userExists: (userId: UserId) => boolean,
  /** Returns a MUTABLE user object */
  getUser: (userId: UserId) => IUser,
  removeUser: (userId: UserId) => boolean,
}

/**
 * @static interface for a static implementation
 */
export interface IExternalEntityController<V, I> {
  new(): unknown,
  getLabels: () => string[],
  getValues: () => V[],
  getImages: () => I[],
  getLabelByValue: (value: V) => string,
}
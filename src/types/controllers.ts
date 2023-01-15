import { EventHandler } from "./common";
import { ContentNode, WithPicture } from "./content";
import { UserData, UserId, UserStatus } from "./user";

export interface IUser {
  id: () => UserId,
  getStatus: () => UserStatus,
  setStatus: (status: UserStatus) => void,
  getData: () => UserData,
  setData: (data: UserData) => void,
  getCurrentContent: () => ContentNode & Partial<WithPicture>,
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

/** This should be implemented by static class */
export interface IExternalEntityController<V, I> {
  new(): unknown,
  getLabels: () => string[],
  getValues: () => V[],
  getImages: () => I[],
  getLabelByValue: (value: V) => string,
}
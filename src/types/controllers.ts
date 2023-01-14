import { EventController } from "@/controllers/eventController";
import { ContentNode, WithPicture } from "./content";
import { EventHandler, Events } from "./event";
import { UserData, UserId, UserStatus } from "./user";

export interface IUser {
  event: EventController,
  id: () => UserId,
  getStatus: () => UserStatus,
  setStatus: (status: UserStatus) => void,
  getData: () => UserData,
  setData: (data: UserData) => void,
  getCurrentContent: () => ContentNode & Partial<WithPicture>,
  nextStep: () => void,
  prevStep: () => void,
  isFirstStep: () => boolean,
  isLastStep: () => boolean,
}

export interface IStoreController {
  addUser: (userId: UserId, data: UserData) => boolean,
  userExists: (userId: UserId) => boolean,
  /** Returns a MUTABLE user object */
  getUser: (userId: UserId) => IUser,
  removeUser: (userId: UserId) => boolean,
}

export interface IEventController {
  on: (event: Events, handler: EventHandler) => void,
  unsubscribe: (event: Events, handler: EventHandler) => void,
  emit: (event: Events) => void
}

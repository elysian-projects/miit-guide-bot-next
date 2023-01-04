import { EventController } from "@/controllers/eventController";
import { Context } from "grammy";
import { Content } from "./content";
import { EventHandler, EventNames } from "./event";
import { UserData, UserId, UserStatus } from "./user";

export interface IMessageController {
  sendData: (ctx: Context, userId: UserId) => void,
}

export interface IUser {
  event: EventController,
  id: () => UserId,
  getStatus: () => UserStatus,
  setStatus: (status: UserStatus) => void,
  getData: () => UserData,
  setData: (data: UserData) => void,
  getCurrentContent: () => Content,
  nextStep: () => void,
  prevStep: () => void,
  isLastStep: () => boolean,
}

export interface IStoreController {
  addUser: (userId: UserId, data: UserData) => void,
  userExists: (userId: UserId) => boolean,
  getUserData: (userId: UserId) => UserData,
  setUserData: (userId: UserId, data: UserData) => void,
  getUserStatus: (userId: UserId) => UserStatus,
  setUserStatus: (userId: UserId, status: UserStatus) => void,
  getCurrentContent: (userId: UserId) => Content,
  removeUser: (userId: UserId) => void,
  nextStep: (userId: UserId) => void,
  prevStep: (userId: UserId) => void,
  isLastStep: (userId: UserId) => boolean,
  on: (userId: UserId, event: EventNames, handler: EventHandler) => void,
  unsubscribe: (userId: UserId, event: EventNames, handler: EventHandler) => void,
  emit: (userId: UserId, event: EventNames) => void
}

export interface IEventController {
  on: (event: EventNames, handler: EventHandler) => void,
  unsubscribe: (event: EventNames, handler: EventHandler) => void,
  emit: (event: EventNames) => void
}

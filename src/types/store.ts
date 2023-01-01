import { User } from "@/controllers/userController";
import { LocationPoint, LocationType } from "./location";
import { UserId, UserState } from "./user";

export type StorageState = Record<UserId, User>;

export interface IStoreController {
  getUserState: (userId: UserId) => UserState,
  addUser: (userId: UserId) => void,
  updateLocation: (userId: UserId, location: LocationType) => void,
  updatePointsList: (userId: UserId, pointsList: LocationPoint[]) => void,
  removeUser: (userId: UserId) => void,
  resetUserState: (userId: UserId) => void
}

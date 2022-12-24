import { LocationPoint, LocationType, UserId, UserState } from "./data";

export interface IStoreController {
  getUserState: (userId: UserId) => UserState,
  addUser: (userId: UserId) => void,
  updateLocation: (userId: UserId, location: LocationType) => void,
  updatePointsList: (userId: UserId, pointsList: LocationPoint[]) => void,
  removeUser: (userId: UserId) => void,
  resetUserState: (userId: UserId) => void
}

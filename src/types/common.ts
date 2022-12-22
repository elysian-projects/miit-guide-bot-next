import { UserId, UserState } from "./data";

export type UpdatePropValue = {
  <P extends keyof UserState, K extends UserState[P]>(userId: UserId, propName: P, propValue: K): void
}

export interface IStoreController {
  getUserState: (userId: UserId) => UserState,
  addUser: (userId: UserId) => void,
  removeUser: (userId: UserId) => void,
  updatePropValue: UpdatePropValue,
  resetUserState: (userId: UserId) => void
}

import { SettableUserProps, UserId, UserState } from "./data";

export interface DataType {
  propName: keyof SettableUserProps,
  propValue: SettableUserProps[keyof SettableUserProps]
}

export interface DataTypeWithId extends DataType {
  userId: UserId,
  step: number
}

export interface UpdatePropValue<T> {
  (data: T): void
}

export interface IStoreController {
  getUserState: (userId: UserId) => UserState,
  addUser: (userId: UserId) => void,
  removeUser: (userId: UserId) => void,
  updatePropValue: UpdatePropValue<DataTypeWithId>,
  resetUserState: (userId: UserId) => void
}

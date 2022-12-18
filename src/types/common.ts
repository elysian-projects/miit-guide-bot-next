import { UserId, UserState } from "./data";

export type UpdatePropValue = {
  <P extends keyof UserState, K extends UserState[P]>(userId: UserId, propName: P, propValue: K): void
}

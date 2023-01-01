import { LocationPoint, LocationType } from "./location";

export type UserId = number;

export interface UserProps {
  location: LocationType,
  locationPoints: LocationPoint[],
}

export interface UserState extends UserProps {
  readonly id: UserId,
  step: number,
}

export interface IUserController {
  getState: () => UserState
  setLocation: (location: LocationType) => void,
  setPointsList: (pointsList: LocationPoint[]) => void
  nextStep: () => void
  prevStep: () => void
  resetState: () => void
}

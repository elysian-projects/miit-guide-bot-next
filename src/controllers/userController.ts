import { defaultState } from "@/constants/state";
import { eventController } from "@/env";
import { LocationPoint, LocationType, UserId, UserState } from "@/types/data";
import { isLocationValid, isPointsListValid } from "@/validations/state";

interface IUserController {
  getState: () => UserState
  setLocation: (location: LocationType) => void,
  setPointsList: (pointsList: LocationPoint[]) => void
  nextStep: () => void
  resetState: () => void
}

export class User implements IUserController {
  private state: UserState;

  public constructor(id: UserId) {
    this.state = {id, ...defaultState};
  }

  public getState = (): UserState => {
    return {...this.state};
  };

  public nextStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    this.state.step = (this.state.step + 1) % this.state.locationPoints.length;

    if(this.isLastStep()) {
      eventController.emit(this.state.id, "end");
    }
  };

  public setLocation = (updatedLocation: LocationType): void => {
    if(!isLocationValid(updatedLocation)) {
      throw new Error("Location is not valid!");
    }

    this.state.location = updatedLocation;
  };

  public setPointsList = (updatedPointsList: LocationPoint[]): void => {
    if(!isPointsListValid(updatedPointsList)) {
      throw new Error("Location is not valid!");
    }

    this.state.locationPoints = updatedPointsList;
  };

  public resetState = (): void => {
    this.state = {
      id: this.state.id,
      ...defaultState,
    };
  };

  private isLastStep = (): boolean => {
    return this.state.step === this.state.locationPoints.length - 1;
  };

  private isPointsListSet = (): boolean => {
    return JSON.stringify(this.state.locationPoints) !== JSON.stringify([]);
  };
}

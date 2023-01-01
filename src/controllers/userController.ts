import { defaultState } from "@/constants/state";
import { eventController } from "@/env";
import { LocationPoint, LocationType } from "@/types/location";
import { IUserController, UserId, UserState } from "@/types/user";
import { isLocationValid, isPointsListValid } from "@/validations/state";

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

    this.state.step += 1;

    if(this.isLastStep()) {
      eventController.emit(this.state.id, "end");
    }
  };

  public prevStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(this.state.step !== 0) {
      this.state.step -= 1;
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
    return this.state.locationPoints.length !== 0;
  };
}

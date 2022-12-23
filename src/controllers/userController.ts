import { defaultState } from "@/constants/state";
import { eventController } from "@/env";
import { DataType, UpdatePropValue } from "@/types/common";
import { UserId, UserState } from "@/types/data";
import { isUserPropValueValid } from "@/utils/store";

interface IUserController {
  getState: () => UserState
  updatePropValue: UpdatePropValue<DataType>,
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

  public updatePropValue: UpdatePropValue<DataType> = ({propName, propValue}): void => {
    if(!isUserPropValueValid(propName, propValue)) {
      throw new Error(`Value ${propValue} cannot be assigned to property ${propName}!`);
    }

    this.state[propName] = propValue;
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
    return this.state.locationPoints.length > 0;
  };
}

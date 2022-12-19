import { defaultState } from "@/constants/state";
import { eventController } from "@/controllers/eventController";
import { UpdatePropValue } from "@/types/common";
import { UserId, UserState } from "@/types/data";

type UpdatePropValueLocal = {
  <P extends keyof UserState, K extends UserState[P]>(propName: P, propValue: K): void
}

interface IUserController {
  getState: () => UserState
  updatePropValue: UpdatePropValueLocal,
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
    this.state.step = (this.state.step + 1) % this.state.locationPoints.length;

    if(this.isLastStep()) {
      this.state.isEnd = true;
      eventController.emit(this.state.id, "end");
    }
  };

  public updatePropValue: UpdatePropValueLocal = (propName, propValue): void => {
    this.state[propName] = propValue;
  };

  public resetState = (): void => {
    this.state = {
      id: this.state.id,
      ...defaultState
    };
  };

  private isLastStep = (): boolean => {
    return this.state.step === this.state.locationPoints.length - 1;
  };
}

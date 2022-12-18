import { defaultState } from "@/constants/state";
import { UpdatePropValue } from "@/types/common";
import { UserId, UserState } from "@/types/data";

interface IUserController {
  getState: () => UserState
  updatePropValue: UpdatePropValue
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
    }
  };

  //FIXME: this method should NOT take user id (the first param here, the underscore)
  public updatePropValue: UpdatePropValue = (_, propName, propValue): void => {
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

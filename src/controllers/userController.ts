import { defaultUserState } from "@/constants/state";
import { IUser } from "@/types/controllers";
import { UserData, UserDataContent, UserId, UserState, UserStatus } from "@/types/user";

export class User implements IUser {
  private state: UserState;
  private changeStepHandlers: (() => void)[];

  public constructor(id: UserId) {
    this.state = {...defaultUserState, id};
    this.changeStepHandlers = [];
  }

  public addChangeStepHandler = (handler: () => void) => {
    this.changeStepHandlers.push(handler);
  };

  public id = (): UserId => {
    return this.state.id;
  };

  public getStatus = (): UserStatus => {
    return this.state.status;
  };

  public setStatus = (status: UserStatus): void => {
    this.state.status = status;
  };

  public getData = (): UserData => {
    return this.state.data;
  };

  public setData = (data: UserData): void => {
    this.state.data = data;
  };

  public getCurrentContent = (): UserDataContent => {
    const currentStep = this.state.data.step;

    if(currentStep >= this.state.data.content.length) {
      throw new Error(`Cannot handle step: ${currentStep}, too few data!`);
    }

    return this.state.data.content[currentStep];
  };

  public nextStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(this.state.data.step !== this.state.data.content.length - 1) {
      this.state.data.step += 1;
      this.callChangeStepHandlers();
    }
  };

  public prevStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(this.state.data.step !== 0) {
      this.state.data.step -= 1;
      this.callChangeStepHandlers();
    }
  };

  private callChangeStepHandlers = (): void => {
    this.changeStepHandlers.forEach(handler => handler());
  };

  public isFirstStep = (): boolean => {
    return this.state.data.step === 0;
  };

  public isLastStep = (): boolean => {
    return this.state.data.step === this.state.data.content.length - 1;
  };

  private isPointsListSet = (): boolean => {
    return this.state.data.content.length !== 0;
  };
}

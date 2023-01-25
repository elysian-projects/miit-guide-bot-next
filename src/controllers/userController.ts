import { IUser } from "@/types/controllers";
import { ChatId, UserData, UserDataContent, UserState } from "@/types/user";

export class User implements IUser {
  private state: UserState;
  private changeStepHandlers: (() => void)[];

  public constructor(id: ChatId) {
    this.state = {id, data: this.getDefaultData()};
    this.changeStepHandlers = [];
  }

  public addChangeStepHandler = (handler: () => void) => {
    this.changeStepHandlers.push(handler);
  };

  public id = (): ChatId => {
    return this.state.id;
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

  public isFirstStep = (): boolean => {
    return this.state.data.step === 0;
  };

  public isLastStep = (): boolean => {
    return this.state.data.step === this.state.data.content.length - 1;
  };

  private callChangeStepHandlers = (): void => {
    this.changeStepHandlers.forEach(handler => handler());
  };

  private isPointsListSet = (): boolean => {
    return this.state.data.content.length !== 0;
  };

  private getDefaultData = (): UserData => {
    return {
      content: [],
      step: 0
    };
  };
}

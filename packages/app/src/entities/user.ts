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

  public setContent = (data: UserDataContent[]): void => {
    this.state.data = {
      ...this.getDefaultData(),
      content: data
    };
  };

  public getCurrentContent = (): UserDataContent => {
    const outerStep = this.state.data.outerStep;

    if(!this.isPointsListSet()) {
      throw new Error("Cannot handle step, too few data!");
    }

    return this.state.data.content[outerStep];
  };

  public getCurrentInnerStep = (): number => {
    return this.state.data.innerStep;
  };

  public getAmountOfInnerContent = (): number => {
    return this.state.data.content[this.state.data.outerStep].content.length;
  };

  // TODO: refactor these chains
  public nextStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    const innerStep = this.state.data.innerStep;
    const outerStep = this.state.data.outerStep;

    if(innerStep < this.state.data.content[outerStep].content.length - 1) {
      this.state.data.innerStep++;
      this.callChangeStepHandlers();
      return;
    }

    if(outerStep < this.state.data.content.length - 1) {
      this.state.data.outerStep++;
      this.state.data.innerStep = 0;
      this.callChangeStepHandlers();
      return;
    }
  };

  // TODO: refactor these chains
  public prevStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    const innerStep = this.state.data.innerStep;
    const outerStep = this.state.data.outerStep;

    if(innerStep > 0) {
      this.state.data.innerStep--;
      this.callChangeStepHandlers();
      return;
    }

    if(outerStep > 0) {
      this.state.data.outerStep--;
      this.state.data.innerStep = this.state.data.content[this.state.data.outerStep].content.length - 1;
      this.callChangeStepHandlers();
      return;
    }
  };

  public isFirstStep = (): boolean => {
    return this.state.data.innerStep === 0 && this.state.data.outerStep === 0;
  };

  // TODO: refactor chains!!!
  public isLastStep = (): boolean => {
    return (this.state.data.outerStep === this.state.data.content.length - 1)
    && (this.state.data.innerStep === this.state.data.content[this.state.data.outerStep].content.length - 1);
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
      innerStep: 0,
      outerStep: 0
    };
  };
}

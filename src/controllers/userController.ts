import { defaultUserState } from "@/constants/state";
import { ContentNode, WithPicture } from "@/types/content";
import { IUser } from "@/types/controllers";
import { Events } from "@/types/event";
import { UserData, UserId, UserState, UserStatus } from "@/types/user";
import { EventController } from "./eventController";

export class User implements IUser {
  private state: UserState;

  public event: EventController;

  public constructor(id: UserId) {
    this.state = {...defaultUserState, id};
    this.event = new EventController(id);

    this.event.on(Events.prevStep, () => this.prevStep());
    this.event.on(Events.nextStep, () => this.nextStep());
  }

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

  public getCurrentContent = (): ContentNode & Partial<WithPicture> => {
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
      this.event.emit(Events.changeStep);
    }
  };

  public prevStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(this.state.data.step !== 0) {
      this.state.data.step -= 1;
      this.event.emit(Events.changeStep);
    }
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

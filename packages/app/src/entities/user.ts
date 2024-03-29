import { Content } from "@/components/content";
import { ChatId, UserState } from "@/types/user";
import { ContentNode, FlatContent } from "common/dist";

export class User {
  private state: UserState;
  private changeStepHandlers: (() => void)[];

  public constructor(id: ChatId) {
    this.state = this.getDefaultData(id);
    this.changeStepHandlers = [];
  }

  public addChangeStepHandler = (handler: () => void) => {
    this.changeStepHandlers.push(handler);
  };

  public id = (): ChatId => {
    return this.state.id;
  };

  public setContent = (data: ContentNode[]): void => {
    this.state = {
      ...this.getDefaultData(this.id()),
      content: new Content(data)
    };
  };

  public getCurrentContent = (): ContentNode<FlatContent> => {
    if(!this.isPointsListSet()) {
      throw new Error("Cannot handle step, too few data!");
    }

    return this.state.content.getContent(this.state.step);
  };

  public getAmountOfContent = (): number => {
    return this.state.content.getAmountOfContent();
  };

  public getCurrentStep = (): number => {
    return this.state.step;
  };

  public nextStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(!this.isLastStep()) {
      this.state.step++;
      this.callChangeStepHandlers();
      return;
    }
  };

  public prevStep = (): void => {
    if(!this.isPointsListSet()) {
      throw new Error("Location points list was not provided!");
    }

    if(!this.isFirstStep()) {
      this.state.step--;
      this.callChangeStepHandlers();
      return;
    }
  };

  public isFirstStep = (): boolean => {
    return this.state.step === 0;
  };

  public isLastStep = (): boolean => {
    return (this.state.step === this.state.content.getAmountOfContent() - 1);
  };

  public isLastArticleNode = (): boolean => {
    return this.state.content.isLastArticleNode(this.state.step);
  };

  private callChangeStepHandlers = (): void => {
    this.changeStepHandlers.forEach(handler => handler());
  };

  private isPointsListSet = (): boolean => {
    return this.state.content.isSet();
  };

  private getDefaultData = (id: ChatId): UserState => {
    return {
      id,
      content: new Content([]),
      step: 0
    };
  };
}

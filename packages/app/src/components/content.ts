import { ContentNode, FlatContent } from "common/dist";

export class Content {
  private content!: ContentNode<FlatContent>[];
  private contentAmount = 0;

  public constructor(content: ContentNode[]) {
    this.setContent(content);
  }

  public isSet = (): boolean => {
    return this.content.length !== 0;
  };

  public getAmountOfContent = (): number => {
    return this.contentAmount;
  };

  public getContent = (step: number): ContentNode<FlatContent> => {
    if(!this.isValidStep(step)) {
      throw new Error("Invalid step value!");
    }

    return this.content[step];
  };

  public setContent = (content: ContentNode[]): void => {
    this.content = this.getFlatContentProjection(content);
    this.contentAmount = this.content.length;
  };

  public isLastArticleNode = (currentStep: number): boolean => {
    if(!this.isValidStep(currentStep)) {
      throw new Error("Invalid step value!");
    }

    if(currentStep === this.content.length - 1) {
      return true;
    }

    const currentNode = this.content[currentStep];
    const nextNode = this.content[currentStep + 1];

    return currentNode.label !== nextNode.label;
  };

  private isValidStep = (step: number): boolean => {
    return (step >= 0 && step <= this.content.length - 1);
  };

  private getFlatContentProjection = (content: ContentNode[]): ContentNode<FlatContent>[] => {
    return content.flatMap(item => item.content.map(currentContent => ({...item, content: currentContent})));
  };
}

import { ArticleType, ContentNode, FlatContent } from "common/dist";

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
    if(!this.validContent(content)) {
      throw new Error("Content of different type was given!");
    }

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

  private validContent = (content: ContentNode[]): boolean => {
    return getArticleType(content) !== "invalid";
  };
}

export const getArticleType = (content: ContentNode[]): ArticleType | "invalid" => {
  const types = content.map(item => item.type);

  return types.every(value => value === "article")
    ? "article"
    : types.every(value => value === "location")
    ? "location"
    : "invalid";
};

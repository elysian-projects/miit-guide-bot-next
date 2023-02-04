import { ArticleType, ContentNode, FlatContent } from "@/common";

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
    if(step < 0 || step > this.contentAmount - 1) {
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

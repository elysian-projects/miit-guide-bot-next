import { ArticleType } from "@/types/content";
import { FlatContent, UserDataContent } from "@/types/user";

export class Content {
  private content!: UserDataContent<FlatContent>[];
  private contentAmount = 0;

  public constructor(content: UserDataContent[]) {
    this.setContent(content);
  }

  public isSet = (): boolean => {
    return this.content.length !== 0;
  };

  public getAmountOfContent = (): number => {
    return this.contentAmount;
  };

  public getContent = (step: number): UserDataContent<FlatContent> => {
    if(step < 0 || step > this.contentAmount - 1) {
      throw new Error("Invalid step value!");
    }

    return this.content[step];
  };

  public setContent = (content: UserDataContent[]): void => {
    if(!this.validContent(content)) {
      throw new Error("Content of different type was given!");
    }

    this.content = this.getFlatContentProjection(content);
    this.contentAmount = this.content.length;
  };

  private getFlatContentProjection = (content: UserDataContent[]): UserDataContent<FlatContent>[] => {
    return content.flatMap(item => item.content.map(currentContent => ({...item, content: currentContent})));
  };

  private validContent = (content: UserDataContent[]): boolean => {
    return getArticleType(content) !== "invalid";
  };
}

export const getArticleType = (content: UserDataContent[]): ArticleType | "invalid" => {
  const types = content.map(item => item.type);

  return types.every(value => value === "article")
    ? "article"
    : types.every(value => value === "location")
    ? "location"
    : "invalid";
};

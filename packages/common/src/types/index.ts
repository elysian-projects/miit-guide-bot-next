export type ArticleType = "article" | "location";

export type RichContent = string[];
export type FlatContent = string;

export interface ContentNode<T extends RichContent | FlatContent = RichContent> {
  id: number,
  /** Value of the parent record */
  tabValue: string,
  /** Public label of the current node */
  label: string,
  /** Value for tracking state in the system */
  value: string,
  /** Rich content that includes main information on the node */
  content: T,
  /** Type of the record */
  type: ArticleType

  picture: string,
  links?: string[]
}

export interface TabNode {
  id: number,
  label: string,
  value: string,
  type: string
}

export interface IResponse<T extends object = object> {
  status: number;
  ok: boolean;
  message?: string;
  data?: T;
}

/** Given type is maybe promise or a value */
export type MaybePromise<T> = T | Promise<T>;

/** Type is either a value or a function that returns the given value */
export type ValueOrGetValue<T> = T | (() => T);

export type EventHandler = () => void;

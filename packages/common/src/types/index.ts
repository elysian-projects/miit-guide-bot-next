export type ArticleType = "articles" | "locations";

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
}

export interface IResponse {
  status: number;
  ok: boolean;
  message: string;
  data: object[];
}

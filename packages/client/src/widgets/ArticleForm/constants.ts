import { ContentNode, FlatContent } from "common/src";

export const defaultFormState: ContentNode<FlatContent> = {
  id: -1,
  label: "",
  content: "",
  picture: "",
  tabId: -1,
  type: "article",
  links: [],
  value: ""
};

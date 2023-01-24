import { ContentNode, WithLinks, WithPicture } from "./content";

export type LocationData = {
  title: string,
  data: Array<ContentNode & WithPicture & Partial<WithLinks>>
}

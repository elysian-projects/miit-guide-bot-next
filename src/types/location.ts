import { ContentNode, WithLinks, WithPicture } from "./content";
import { Image } from "./lib";

// Locations available for choice
export type LocationValues = "street" | "building1";
export type LocationImage = Image<LocationValues>;

export type LocationData = {
  title: string,
  data: Array<ContentNode & WithPicture & Partial<WithLinks>>
}

import { Image, LocationLabelProp } from "./common";
import { ContentNode, WithLinks, WithPicture } from "./content";

export type LocationsList =
  | "street"
  | "building1";

export interface Location extends ContentNode, Partial<WithLinks>, Partial<WithPicture> {}

export type LocationImage = Image<LocationsList, LocationLabelProp>;

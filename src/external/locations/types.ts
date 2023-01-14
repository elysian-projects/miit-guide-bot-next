import { Image } from "@/types/common";
import { ContentNode, WithLinks, WithPicture } from "@/types/content";

export type LocationValueProp = string;
export type LocationLabelProp = string;

export type LocationsList = "street" | "building1";

export type LocationImage = Image<LocationsList, LocationLabelProp>;

export interface Location extends ContentNode, Partial<WithLinks>, Partial<WithPicture> {}

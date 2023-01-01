import { locations } from "@/env";
import { Imaginable, LocationLabelProp, LocationValueProp } from "./general";

export interface LocationType extends Imaginable {
  value: LocationValueProp,
  label: LocationLabelProp,
}

export type LocationList = Record<keyof typeof locations, LocationType>;

export type LocationPoint = {
  name: string,
  description: string,
  picture: string
  links: string[]
}

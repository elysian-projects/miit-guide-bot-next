import { locations } from "@/env";

export type LocationValue = string;
export type LocationLabel = string;

export type LocationType = {
  value: LocationValue,
  label: LocationLabel,
}

export type Locations = {
  [key in keyof typeof locations]: LocationType;
};

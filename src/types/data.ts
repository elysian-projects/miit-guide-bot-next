import { locations } from "../env";

export type LocationValue = string;
export type LocationLabel = string;

export type Location = {
  value: LocationValue,
  label: LocationLabel,
}

export type Locations = {
  [key in keyof typeof locations]: Location;
};

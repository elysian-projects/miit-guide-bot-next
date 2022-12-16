import { locations } from "@/env";

export type LocationValueProp = string;
export type LocationLabelProp = string;

export type LocationType = {
  value: LocationValueProp,
  label: LocationLabelProp,
}

export type LocationList = {
  [key in keyof typeof locations]: LocationType;
};

export type LocationData = {
  name: string,
  description: string,
  picture: string
  links: string[]
}

export type UserId = string;

export type UserState = {
  id: UserId,
  currentLocation: keyof LocationList | "unknown",
  currentStep: number,
  locationData: LocationData | null
}

export type StorageState = {
  [key: UserId]: UserState
}

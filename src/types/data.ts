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

export type LocationData = {
  name: string,
  description: string,
  picture: string
  links: string[]
}

export type UserId = string;

export type User = {
  id: UserId,
  currentLocation: keyof Locations | "unknown",
  currentStep: number,
  data: LocationData | null
}

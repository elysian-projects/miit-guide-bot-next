import { User } from "@/entities/user";
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

export type LocationPoint = {
  name: string,
  description: string,
  picture: string
  links: string[]
}

export type UserId = string;

export type UserState = {
  readonly id: UserId,
  location: LocationType,
  step: number,
  locationPoints: LocationPoint[],
  isEnd: boolean,
}

export type StorageState = {
  [key: UserId]: User
}

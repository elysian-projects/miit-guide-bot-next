import { User } from "@/controllers/userController";
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

export type UserId = number;

export interface SettableUserProps{
  location: LocationType,
  locationPoints: LocationPoint[],
}

export interface UserState extends SettableUserProps {
  readonly id: UserId,
  step: number,
}

export type StorageState = {
  [key: UserId]: User
}

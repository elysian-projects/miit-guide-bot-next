import { KeyboardButtons } from "@/constants/buttons";
import { locationLabels, locationValues } from "@/constants/locations";
import { Content } from "@/types/content";
import { LocationType } from "@/types/location";

export const isLocationValid = (candidate: LocationType): boolean => {
  return (locationLabels.includes(candidate.label)) && (locationValues.includes(candidate.value));
};

export const isContentListValid = (candidate: Content[]): boolean => {
  return (candidate.length > 0);
};

export const isValidControlButton = (candidate: string) => {
  return Object.keys(KeyboardButtons).includes(candidate);
};

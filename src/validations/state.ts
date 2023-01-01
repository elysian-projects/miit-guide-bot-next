import { Keyboard } from "@/constants/buttons";
import { locationLabels, locationValues } from "@/constants/locations";
import { LocationPoint, LocationType } from "@/types/location";

export const isLocationValid = (candidate: LocationType): boolean => {
  return (locationLabels.includes(candidate.label)) && (locationValues.includes(candidate.value));
};

export const isPointsListValid = (candidate: LocationPoint[]): boolean => {
  return (candidate.length > 0);
};

export const isValidControlButton = (candidate: string) => {
  return Object.keys(Keyboard).includes(candidate);
};

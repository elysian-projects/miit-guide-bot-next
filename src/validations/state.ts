import { locationLabels, locationValues } from "@/constants/locations";
import { LocationPoint, LocationType } from "@/types/data";

export const isLocationValid = (candidate: LocationType): boolean => {
  return (locationLabels.includes(candidate.label)) && (locationValues.includes(candidate.value));
};

export const isPointsListValid = (candidate: LocationPoint[]): boolean => {
  return (candidate.length > 0);
};

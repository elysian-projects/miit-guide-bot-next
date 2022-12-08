import { locationLabels, locationValues } from "@/constants/locations";
import { LocationLabel, LocationType, LocationValue } from "@/types/data";

export const createLocation = (value: LocationValue, label: LocationLabel): LocationType => {
  return {value, label};
};

export const isLocationValid = (candidate: string): boolean => {
  return (candidate in locationLabels) || (candidate in locationValues);
};

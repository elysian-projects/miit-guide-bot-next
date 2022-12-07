import { locationLabels, locationValues } from "@/constants/locations";
import { Location, LocationLabel, LocationValue } from "@/types/data";

export const createLocation = (value: LocationValue, label: LocationLabel): Location => {
  return {value, label};
};

export const isLocationValid = (candidate: string): boolean => {
  return (candidate in locationLabels) || (candidate in locationValues);
};

import { locationLabels, locationValues } from "@/constants/locations";

export const isLocationValid = (candidate: string): boolean => {
  return (candidate in locationLabels) || (candidate in locationValues);
};

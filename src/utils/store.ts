import { defaultLocation } from "@/constants/state";
import { LocationImage } from "@/types/location";

export const isDefaultLocation = (location: LocationImage): boolean => {
  return (location.value !== defaultLocation.value) && (location.label !== defaultLocation.label);
};

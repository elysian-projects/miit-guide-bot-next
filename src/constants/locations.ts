import { locations } from "@/env";
import { LocationType } from "@/types/data";

/**
 * Extracts value with `prop` from the list of locations and returns an array of its values
 * @private
 */
const getLocationProp = (locationsList: LocationType[], prop: keyof LocationType): string[] => {
  console.log(locationsList);

  return Object.values(locationsList).map(location => location[prop]);
};

export const locationValues: string[] = getLocationProp(Object.values(locations), "value");
export const locationLabels: string[] = getLocationProp(Object.values(locations), "label");

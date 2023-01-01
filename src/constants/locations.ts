import { locations } from "@/env";
import { LocationType } from "@/types/location";

/**
 * Extracts value with `prop` from the list of locations and returns an array of its values
 * @private
 */
const getLocationProp = (locationsList: LocationType[], prop: keyof LocationType): string[] => {
  return Object.values(locationsList).map(location => location[prop]);
};

/**
 * Represents `locations` list as an array of `LocationType`
 * @private
 */
const locationsAsArray = Object.values(locations);

export const locationValues: string[] = getLocationProp(locationsAsArray, "value");
export const locationLabels: string[] = getLocationProp(locationsAsArray, "label");

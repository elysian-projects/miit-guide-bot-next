import { createLocation } from "@/utils/data";
import { LocationType } from "./types/data";

/**
 * Init locations type
 * @private
 */
type LocationsInitList = {
  [key: string]: LocationType
}

/**
 * Init locations
 */
export const locations: LocationsInitList = {
  street: createLocation("street", "Улица"),
  building1: createLocation("building1", "Корпус 1")
};

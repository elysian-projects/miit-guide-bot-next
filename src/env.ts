import { LocationType } from "@/types/data";

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
  street: {value: "street", label: "Улица"},
  building1: {value: "building1", label: "Корпус 1"},
};

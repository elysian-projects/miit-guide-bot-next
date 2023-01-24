import { Image } from "@/types/lib";
import { LocationImage } from "@/types/location";
import { TabImage } from "@/types/user";

// The tabs must be hardcoded because there is no way to fetch the data
// from the server and to be listening to the values concurrently.
// The values must be THE SAME AS IN THE DATABASE (see `/migrations/0004_insert-tabs-tables.sql`)
/**
 * @deprecated this will be replaced with the database
 */
export const tabImages: TabImage[] = [
  {label: "Памятники РУТ", value: "locations"},
  {label: "МИИТ в годы ВОВ", value: "ww2"}
];

/**
 * @deprecated this will be replaced with the database
 */
export const locationImages: LocationImage[] = [
  {label: "Улица", value: "street"},
  {label: "Корпус 1", value: "building1"},
];

/**
 * Button that triggers location choice menu
 */
export const locationButton: Image = {
  label: "Памятники РУТ", value: "locations"
};

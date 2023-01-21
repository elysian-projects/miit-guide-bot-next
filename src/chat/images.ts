import { LocationImage } from "@/types/location";
import { TabImage } from "@/types/user";

// The tabs must be hardcoded because there is no way to fetch the data
// from the server and to be listening to the values concurrently
export const tabImages: TabImage[] = [
  {label: "Памятники РУТ", value: "locations"},
  {label: "МИИТ в годы ВОВ", value: "ww2"}
];

export const locationImages: LocationImage[] = [
  {label: "Улица", value: "street"},
  {label: "Корпус 1", value: "building1"},
];
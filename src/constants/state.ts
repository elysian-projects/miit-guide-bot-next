import { LocationType } from "@/types/location";
import { UserState } from "@/types/user";

export const defaultLocation: LocationType = {value: "unknown", label: "unknown"};

export const defaultState: Omit<UserState, "id"> = {
  location: defaultLocation,
  step: 0,
  locationPoints: []
};

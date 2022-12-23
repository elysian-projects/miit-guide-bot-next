import { LocationType, UserState } from "@/types/data";

export const defaultLocation: LocationType = {value: "unknown", label: "unknown"};

export const defaultState: Omit<UserState, "id"> = {
  location: defaultLocation,
  step: 0,
  locationPoints: []
};

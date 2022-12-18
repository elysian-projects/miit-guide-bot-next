import { LocationType, UserState } from "@/types/data";

export const defaultLocation: LocationType = {value: "unknown", label: "unknown"};

export const defaultState = {
  location: defaultLocation,
  step: 0,
  locationPoints: [],
  isEnd: false,
} as Omit<UserState, "id">;

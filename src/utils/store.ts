import { defaultLocation } from "@/constants/state";
import { LocationType, StorageState, UserId } from "@/types/data";

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  return Object.keys(userList).includes(userId);
};

export const isLocationChosen = (location: LocationType): boolean => {
  return (location.value !== defaultLocation.value) && (location.label !== defaultLocation.label);
};

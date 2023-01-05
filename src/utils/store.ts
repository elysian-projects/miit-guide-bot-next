import { defaultLocation } from "@/constants/state";
import { LocationImage } from "@/types/location";
import { StorageState } from "@/types/store";
import { UserId } from "@/types/user";

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  return Object.keys(userList).includes(userId.toString());
};

export const isLocationChosen = (location: LocationImage): boolean => {
  return (location.value !== defaultLocation.value) && (location.label !== defaultLocation.label);
};

import { locationLabels, locationValues } from "@/constants/locations";
import { StorageState, UserId } from "@/types/data";

export const isLocationValid = (candidate: string): boolean => {
  return (candidate in locationLabels) || (candidate in locationValues);
};

export const removeUserFromList = (userList: StorageState, userId: UserId): void => {
  for(const key in userList) {
    if(key === userId) {
      delete userList[key];
    }
  }
};

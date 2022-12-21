import { locationLabels, locationValues } from "@/constants/locations";
import { StorageState, UserId } from "@/types/data";

export const isLocationValid = (candidate: string): boolean => {
  return (locationLabels.includes(candidate)) || (locationValues.includes(candidate));
};

export const removeUserFromList = (userList: StorageState, userId: UserId): StorageState => {
  const updatedUserList: StorageState = {};

  for(const key in userList) {
    if(key !== userId) {
      updatedUserList[key] = userList[key];
    }
  }

  return updatedUserList;
};

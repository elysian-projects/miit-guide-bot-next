import { locationLabels, locationValues } from "@/constants/locations";
import { StorageState, UserId } from "@/types/data";

export const isLocationValid = (candidate: string): boolean => {
  return (candidate in locationLabels) || (candidate in locationValues);
};

export const removeUserFromList = (userList: StorageState, userId: UserId): StorageState => {
  const updatedUserList = {...userList};

  for(const key in updatedUserList) {
    if(key === userId) {
      delete updatedUserList[key];
    }
  }

  return updatedUserList;
};

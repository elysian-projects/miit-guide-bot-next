import { StorageState, UserId } from "@/types/data";

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  for(const key in userList) {
    if(key !== userId) {
      return true;
    }
  }

  return false;
};

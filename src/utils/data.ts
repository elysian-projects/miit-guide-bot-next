import { StorageState, UserId } from "@/types/data";

export const removeUserFromList = (userList: StorageState, userId: UserId): StorageState => {
  const updatedUserList: StorageState = {};

  for(const key in userList) {
    if(key !== userId.toString()) {
      updatedUserList[key] = userList[key];
    }
  }

  return updatedUserList;
};

import { tabsData } from "@/env";
import { StorageState } from "@/types/store";
import { Tab, TabsList } from "@/types/tabs";
import { UserId } from "@/types/user";

export const removeUserFromList = (userList: StorageState, userId: UserId): StorageState => {
  const updatedUserList: StorageState = {};

  for(const key in userList) {
    if(key !== userId.toString()) {
      updatedUserList[key] = userList[key];
    }
  }

  return updatedUserList;
};

export const getTabData = (tabValue: TabsList): Tab => {
  return tabsData[tabValue];
};

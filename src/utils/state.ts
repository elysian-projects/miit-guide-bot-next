import StateDefaults from "@/constants/state";
import { StorageState, UserId, UserState } from "@/types/data";

export const getInitialUserState = (userId: UserId): UserState => ({
  id: userId,
  currentLocation: StateDefaults.DEFAULT_LOCATION,
  currentStep: StateDefaults.DEFAULT_CURRENT_STEP,
  locationData: StateDefaults.DEFAULT_LOCATION_DATA
});

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  for(const key in userList) {
    if(key !== userId) {
      return true;
    }
  }

  return false;
};

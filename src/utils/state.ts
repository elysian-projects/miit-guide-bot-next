import StateDefaults from "@/constants/state";
import { StorageState, UserId, UserState } from "@/types/data";

/**
 * Returns an object with initial user state and sets the given user id
 */
export const getInitialUserState = (userId: UserId): UserState => ({
  id: userId,
  currentLocation: StateDefaults.DEFAULT_LOCATION,
  currentStep: StateDefaults.DEFAULT_CURRENT_STEP,
  locationPoints: [],
  isEnd: false,
});

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  for(const key in userList) {
    if(key !== userId) {
      return true;
    }
  }

  return false;
};

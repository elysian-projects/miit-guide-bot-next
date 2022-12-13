import StateDefaults from "@/constants/state";
import { User, UserId } from "@/types/data";

export const createUserState = (userId: UserId): User => ({
  id: userId,
  currentLocation: StateDefaults.DEFAULT_LOCATION,
  currentStep: StateDefaults.DEFAULT_CURRENT_STEP
});

export const userExists = (userList: User[], userId: UserId): boolean => {
  return userList.some(user => user.id === userId);
};

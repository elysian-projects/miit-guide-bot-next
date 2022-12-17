import { createUserStore } from "@/entities/state";
import { LocationPoint, LocationType, UserId, UserState } from "@/types/data";

/**
 * Global state for all users
 * @private
 */
const userStore = createUserStore();

export class StateController {
  public addUser = (userId: UserId) => {
    userStore.addUser(userId);
  };

  public removeUser = (userId: UserId) => {
    userStore.removeUser(userId);
  };

  public static setLocationName = (locationName: LocationType, userId: UserId): void => {
    userStore.updatePropValue(userId, "currentLocation", locationName);
  };

  public static setLocationPoints = (locationsPoints: LocationPoint[], userId: UserId): void => {
    userStore.updatePropValue(userId, "locationPoints", locationsPoints);
  };

  public static nextStep = (userId: UserId): void => {
    const currentUserState = this.getUserState(userId);

    const nextStep = (currentUserState.currentStep + 1) % currentUserState.locationPoints.length;

    if(nextStep === currentUserState.locationPoints.length - 1) {

    }

    userStore.updatePropValue(userId, "currentStep", nextStep);
  };

  public static getUserState = (userId: UserId): UserState => {
    return userStore.applicationStorage[userId];
  };

  public static isLocationChosen = (userId: UserId): boolean => {
    return this.getUserState(userId).currentLocation !== null;
  };

  public static resetUserData = (userId: UserId): void => {
    userStore.resetUserState(userId);
  };
}

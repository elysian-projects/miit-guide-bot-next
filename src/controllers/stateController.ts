import { defaultLocation } from "@/constants/state";
import { LocationPoint, LocationType, UserId, UserState } from "@/types/data";
import { eventController } from "./eventController";
import { StoreController } from "./storeController";

/**
 * @private
 */
const storeController = new StoreController();

/**
 * Application state controller that interacts with the store controller and makes the logic more declarative
 */
export class StateController {
  public addUser = (userId: UserId) => {
    storeController.addUser(userId);
  };

  public removeUser = (userId: UserId) => {
    storeController.removeUser(userId);
  };

  public setLocationName = (locationName: LocationType, userId: UserId): void => {
    storeController.updatePropValue(userId, "location", locationName);
  };

  public setLocationPoints = (locationsPoints: LocationPoint[], userId: UserId): void => {
    storeController.updatePropValue(userId, "locationPoints", locationsPoints);
  };

  public nextStep = (userId: UserId): void => {
    eventController.emit(userId, "nextStep");
  };

  public getUserState = (userId: UserId): UserState => {
    return storeController.getUserState(userId);
  };

  public isLocationChosen = (userId: UserId): boolean => {
    return this.getUserState(userId).location.value !== defaultLocation.value;
  };

  public resetUserData = (userId: UserId): void => {
    storeController.resetUserState(userId);
  };
}

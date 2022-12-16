import { } from "@/entities/state/store";
import { LocationData, LocationList, UserId, UserState } from "@/types/data";

export class StateController {
  public static setLocation = (location: LocationList, userId: UserId): void => {
    // TODO: this
  };

  public static updatePointsList = (pointsList: LocationData[], userId: UserId): void => {
    // TODO: this
  };

  public static nextStep = (userId: UserId): void => {
    // TODO: this
  };

  public static getUserState = (userId): UserState => {
    // TODO: this
  };

  public static isLocationChosen = (userId: UserId): boolean => {
    // TODO: this
  };

  public static resetUserData = (userId: UserId): void => {
    // TODO: this
  };
}

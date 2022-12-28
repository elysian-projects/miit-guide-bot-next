import { User } from "@/controllers/userController";
import { eventController } from "@/env";
import { IStoreController } from "@/types/common";
import { LocationPoint, LocationType, StorageState, UserId, UserState } from "@/types/data";
import { removeUserFromList } from "@/utils/data";
import { userExists } from "@/utils/store";

export class StoreController implements IStoreController {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  public getUserState = (userId: UserId): UserState => {
    this.checkIfUserExists(userId);
    return this.store[userId].getState();
  };

  public addUser = (userId: UserId): void => {
    if(userExists(this.store, userId)) {
      throw new Error(`User with id ${userId} already exists!`);
    }
    this.store[userId] = new User(userId);

    eventController.on(userId, "nextStep", () => this.onNextStep(userId));
  };

  public removeUser = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store = removeUserFromList(this.store, userId);
  };

  public nextStep = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    eventController.emit(userId, "nextStep");
  };

  public updateLocation = (userId: UserId, location: LocationType): void => {
    this.checkIfUserExists(userId);
    this.store[userId].setLocation(location);
  };

  public updatePointsList = (userId: UserId, pointsList: LocationPoint[]): void => {
    this.checkIfUserExists(userId);
    this.store[userId].setPointsList(pointsList);
  };

  public resetUserState = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store[userId].resetState();
  };

  private onNextStep = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store[userId].nextStep();
  };

  /**
   * @throws Error
   */
  private checkIfUserExists = (userId: UserId): void => {
    if(!userExists(this.store, userId)) {
      throw new Error(`User with id ${userId} not found!`);
    }
  };
}

import { User } from "@/controllers/userController";
import { UpdatePropValue } from "@/types/common";
import { StorageState, UserId, UserState } from "@/types/data";
import { removeUserFromList } from "@/utils/data";
import { userExists } from "@/utils/state";
import { eventController } from "./eventController";

const throwErrorIfNoUserFound = (state: StorageState, userId: UserId): void => {
  if(!userExists(state, userId)) {
    throw new Error(`No user with id ${userId} found!`);
  }
};

interface IStoreController {
  getUserState: (userId: UserId) => UserState,
  addUser: (userId: UserId) => void,
  removeUser: (userId: UserId) => void,
  updatePropValue: UpdatePropValue,
  resetUserState: (userId: UserId) => void
}

export class StoreController implements IStoreController {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  public getUserState = (userId: string): UserState => {
    throwErrorIfNoUserFound(this.store, userId);
    return this.store[userId].getState();
  };

  public addUser = (userId: UserId): void => {
    if(userExists(this.store, userId)) {
      throw new Error(`User with id ${userId} already exists!`);
    }
    this.store[userId] = new User(userId);

    eventController.on(userId, "nextStep", () => this.onNextStep(userId));
    eventController.on(userId, "end", () => this.removeUser(userId));
  };

  public removeUser = (userId: UserId): void => {
    throwErrorIfNoUserFound(this.store, userId);
    this.store = removeUserFromList(this.store, userId);
  };

  public updatePropValue: UpdatePropValue = (userId, propName, propValue): void => {
    throwErrorIfNoUserFound(this.store, userId);
    this.store[userId].updatePropValue(propName, propValue);
  };

  public resetUserState = (userId: UserId): void => {
    if(userExists(this.store, userId)) {
      this.store[userId].resetState();
    }
  };

  private onNextStep = (userId: UserId): void => {
    throwErrorIfNoUserFound(this.store, userId);
    this.store[userId].nextStep();
  };
}

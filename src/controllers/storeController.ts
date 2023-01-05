import { User } from "@/controllers/userController";
import { ContentNode, WithPicture } from "@/types/content";
import { IStoreController } from "@/types/controllers";
import { EventHandler, EventNames } from "@/types/event";
import { StorageState } from "@/types/store";
import { UserData, UserId, UserStatus } from "@/types/user";
import { removeUserFromList } from "@/utils/data";
import { userExists } from "@/utils/store";

export class StoreController implements IStoreController {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  public addUser = (userId: UserId): void => {
    if(userExists(this.store, userId)) {
      throw new Error(`User with id ${userId} already exists!`);
    }
    this.store[userId] = new User(userId);
  };

  public userExists = (userId: UserId): boolean => {
    return userExists(this.store, userId);
  };

  public getUserStatus = (userId: UserId): UserStatus => {
    this.checkIfUserExists(userId);
    return this.store[userId].getStatus();
  };

  public setUserStatus = (userId: UserId, status: UserStatus): void => {
    this.checkIfUserExists(userId);
    this.store[userId].setStatus(status);
  };

  public getUserData = (userId: number): UserData => {
    this.checkIfUserExists(userId);
    return this.store[userId].getData();
  };

  public setUserData = (userId: UserId, data: UserData): void => {
    this.checkIfUserExists(userId);
    this.store[userId].setData(data);
  };

  public getCurrentContent = (userId: UserId): ContentNode & Partial<WithPicture> => {
    this.checkIfUserExists(userId);
    return this.store[userId].getCurrentContent();
  };

  public removeUser = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store = removeUserFromList(this.store, userId);
  };

  public nextStep = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store[userId].event.emit("nextStep");
  };

  public prevStep = (userId: UserId): void => {
    this.checkIfUserExists(userId);
    this.store[userId].event.emit("prevStep");
  };

  public isLastStep = (userId: number): boolean => {
    this.checkIfUserExists(userId);
    return this.store[userId].isLastStep();
  };

  public on = (userId: UserId, event: EventNames, handler: EventHandler): void => {
    this.checkIfUserExists(userId);
    this.store[userId].event.on(event, handler);
  };

  public unsubscribe = (userId: UserId, event: EventNames, handler: EventHandler): void => {
    this.checkIfUserExists(userId);
    this.store[userId].event.unsubscribe(event, handler);
  };

  public emit = (userId: UserId, event: EventNames): void => {
    this.checkIfUserExists(userId);
    this.store[userId].event.emit(event);
  };

  /** @throws Error with message */
  private checkIfUserExists = (userId: UserId): void => {
    if(!this.userExists(userId)) {
      throw new Error(`User with id ${userId} not found!`);
    }
  };
}

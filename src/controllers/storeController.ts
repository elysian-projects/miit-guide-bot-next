import { User } from "@/controllers/userController";
import { IStoreController, IUser } from "@/types/controllers";
import { Events } from "@/types/event";
import { StorageState } from "@/types/store";
import { UserId } from "@/types/user";

export class StoreController implements IStoreController {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  public addUser = (userId: UserId): boolean => {
    if(this.userExists(userId)) {
      return false;
    }

    this.store[userId] = new User(userId);

    this.getUser(userId).event.on(Events.changeStep, () => console.log("Event changed"));

    return true;
  };

  public getUser = (userId: number): IUser => {
    if(!this.userExists(userId)) {
      throw new Error(`User with id ${userId} does not exist!`);
    }

    return this.store[userId];
  };

  public removeUser = (userId: UserId): boolean => {
    if(!this.userExists(userId)) {
      return false;
    }

    const updatedList: StorageState = {};

    for(const key of Object.keys(this.store)) {
      const currentUserId = Number(key);

      if(currentUserId !== userId) {
        updatedList[currentUserId] = this.store[currentUserId];
      }
    }

    this.store = updatedList;

    return !this.userExists(userId);
  };

  public userExists = (userId: UserId): boolean => {
    return Object.keys(this.store).includes(userId.toString());
  };
}

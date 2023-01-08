import { User } from "@/controllers/userController";
import { IStoreController, IUser } from "@/types/controllers";
import { StorageState } from "@/types/store";
import { UserId } from "@/types/user";
import { removeUserFromList } from "@/utils/data";

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

    this.store = removeUserFromList(this.store, userId);
    return true;
  };

  public userExists = (userId: UserId): boolean => {
    return Object.keys(this.store).includes(userId.toString());
  };
}

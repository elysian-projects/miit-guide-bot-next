import { User } from "@/controllers/userController";
import { IStoreController, IUser } from "@/types/controllers";
import { StorageState } from "@/types/store";
import { UserId } from "@/types/user";

export class StoreController implements IStoreController {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  /**
   * Creates a new user whether it already exists or not. The existing user with the same `id` will be removed and recreated
   * @param {UserId} userId - chat id provided by the Telegram API
   */
  public addUser = (userId: UserId): void => {
    this.store[userId] = new User(userId);
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

    this.store = Object.values({...this.store}).filter(user => user.id() !== userId);

    return !this.userExists(userId);
  };

  public userExists = (userId: UserId): boolean => {
    return Object.keys(this.store).includes(userId.toString());
  };
}

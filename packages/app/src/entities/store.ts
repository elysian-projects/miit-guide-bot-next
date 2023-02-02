import { User } from "@/entities/user";
import { IStore, IUser } from "@/types/controllers";
import { ChatId, StorageState } from "@/types/user";

export class Store implements IStore {
  private store: StorageState;

  public constructor() {
    this.store = {};
  }

  /**
   * Creates a new user whether it already exists or not. The existing user with the same `id` will be removed and recreated
   * @param {ChatId} chatId - chat id provided by the Telegram API
   */
  public addUser = (chatId: ChatId): IUser => {
    this.store[chatId] = new User(chatId);
    return this.store[chatId];
  };

  public getUser = (chatId: number): IUser => {
    if(!this.userExists(chatId)) {
      throw new Error(`User with id ${chatId} does not exist!`);
    }

    return this.store[chatId];
  };

  public removeUser = (chatId: ChatId): boolean => {
    if(!this.userExists(chatId)) {
      return false;
    }

    const store: StorageState = {};

    for(const user of Object.values(this.store)) {
      if(user.id() !== chatId) {
        store[user.id()] = user;
      }
    }

    this.store = store;

    return !this.userExists(chatId);
  };

  public userExists = (chatId: ChatId): boolean => {
    return Boolean(this.store[chatId]);
  };
}

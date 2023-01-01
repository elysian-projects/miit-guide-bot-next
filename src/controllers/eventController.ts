import { Events } from "@/types/event";
import { UserId } from "@/types/user";

export class EventController {
  private events: Record<UserId, Record<keyof typeof Events, Array<() => void>>>;

  public constructor() {
    this.events = {};
  }

  public on = (userId: UserId, event: keyof typeof Events, callback: () => void): void => {
    if(!this.userExists(userId)) {
      this.addUser(userId);
    }

    this.events[userId][event].push(callback);
  };

  public unsubscribe = (userId: UserId, event: keyof typeof Events, callback: () => void): void => {
    this.checkIfUserExists(userId);
    this.events[userId][event] = this.events[userId][event].filter(handler => handler !== callback);
  };

  public emit = (userId: UserId, event: keyof typeof Events): void => {
    this.checkIfUserExists(userId);
    this.events[userId][event].forEach(callback => callback());
  };

  /**
   * Resets all events and deletes all users, DON'T use in production!
   * @deprecated
   */
  public reset = (): void => {
    this.events = {};
  };

  private userExists = (userId: UserId): boolean => {
    return Boolean(this.events[userId]);
  };

  private addUser = (userId: UserId): void => {
    if(this.userExists(userId)) {
      throw new Error(`User ${userId} already exists!`);
    }

    this.events[userId] = {
      end: [],
      nextStep: [],
      prevStep: []
    };
  };

  private checkIfUserExists = (userId: UserId): void => {
    if(!this.userExists(userId)) {
      throw new Error(`User ${userId} does not exist!`);
    }
  };
}

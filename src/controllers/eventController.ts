import { UserId } from "@/types/data";
import { Events } from "@/types/event";

class EventController {
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

  public unsubscribe = (userId: UserId, event: keyof typeof Events, callback: () => void) => {
    this.events[userId][event].filter(handler => handler !== callback);
  };

  public emit = (userId: UserId, event: keyof typeof Events): void => {
    this.events[userId][event].forEach(callback => callback());
  };

  /**
   * Resets all events and deletes all users, DON'T use in production!
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
      nextStep: []
    };
  };
}

export const eventController = new EventController();

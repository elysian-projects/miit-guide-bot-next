import { UserId } from "@/types/data";
import { Events } from "@/types/event";

class EventController {
  private events: Record<UserId, Record<keyof typeof Events, Array<() => void>>>;

  public constructor() {
    this.events = {};
  }

  public on = (userId: UserId, event: keyof typeof Events, callback: () => void): void => {
    this.events[userId][event].push(callback);
  };

  public unsubscribe = (userId: UserId, event: keyof typeof Events, callback: () => void) => {
    this.events[userId][event].filter(handler => handler !== callback);
  };

  public emit = (userId: UserId, event: keyof typeof Events): void => {
    this.events[userId][event].forEach(callback => callback());
  };
}

export const eventController = new EventController();

import { DEFAULT_EVENT_STATE } from "@/constants/events";
import { IEventController } from "@/types/controllers";
import { EventHandler, Events } from "@/types/event";
import { UserId } from "@/types/user";

export class EventController implements IEventController {
  private userId: UserId;
  private events: Record<keyof typeof Events, EventHandler[]>;

  public constructor(userId: UserId) {
    this.userId = userId;
    this.events = DEFAULT_EVENT_STATE;
  }

  public on = (event: Events, callback: EventHandler): void => {
    this.events[event].push(callback);
  };

  public unsubscribe = (event: Events, callback: EventHandler): void => {
    this.events[event] = this.events[event].filter(handler => handler !== callback);
  };

  public emit = (event: Events): void => {
    this.events[event].forEach(callback => callback(this.userId));
  };
}

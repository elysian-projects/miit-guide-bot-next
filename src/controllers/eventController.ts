import { DEFAULT_EVENT_STATE } from "@/constants/events";
import { IEventController } from "@/types/controllers";
import { EventHandler, EventNames, Events } from "@/types/event";
import { UserId } from "@/types/user";

export class EventController implements IEventController {
  private userId: UserId;
  private events: Record<keyof typeof Events, EventHandler[]>;

  public constructor(userId: UserId) {
    this.userId = userId;
    this.events = DEFAULT_EVENT_STATE;
  }

  public on = (event: EventNames, callback: EventHandler): void => {
    this.events[event].push(callback);
  };

  public unsubscribe = (event: EventNames, callback: EventHandler): void => {
    this.events[event] = this.events[event].filter(handler => handler !== callback);
  };

  public emit = (event: EventNames): void => {
    this.events[event].forEach(callback => callback(this.userId));
  };
}

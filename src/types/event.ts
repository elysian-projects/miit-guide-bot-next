import { UserId } from "./user";

export type EventHandler = {
  (userId: UserId): void
}

export enum Events {
  nextStep,
  prevStep,
  end
}

export type EventNames = keyof typeof Events;

import { UserId } from "./user";

export type EventHandler = {
  (userId: UserId): void
}

export enum Events {
  nextStep,
  prevStep,
  changeStep,
  end
}

export type EventNames = keyof typeof Events;

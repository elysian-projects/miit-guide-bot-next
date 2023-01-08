import { UserId } from "./user";

export type EventHandler = {
  (userId: UserId): void
}

export enum Events {
  nextStep = "nextStep",
  prevStep = "prevStep",
  changeStep = "changeStep",
  end = "end"
}

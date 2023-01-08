import { EventHandler, Events } from "@/types/event";

export const DEFAULT_EVENT_STATE: Record<Events, EventHandler[]> = {
  nextStep: [],
  prevStep: [],
  changeStep: [],
  end: []
};

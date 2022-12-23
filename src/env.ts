import { EventController } from "@/controllers/eventController";

export const eventController = new EventController();

/**
 * Init locations
 */
export const locations = {
  street: {value: "street", label: "Улица"},
  building1: {value: "building1", label: "Корпус 1"},
};

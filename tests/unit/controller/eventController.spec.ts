import { eventController } from "@/env";
import { UserId } from "@/types/user";
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";

const userId: UserId = 0;

beforeEach(() => {
  eventController.reset();
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("event controller flow", () => {
  test("should subscribe to events and call handlers on event emit", () => {
    const handlers = {
      handler1: () => 0,
      handler2: () => 0,
    };

    const spyHandler1 = jest.spyOn(handlers, "handler1");
    const spyHandler2 = jest.spyOn(handlers, "handler2");

    eventController.on(userId, "nextStep", handlers.handler1);
    eventController.on(userId, "nextStep", handlers.handler2);

    eventController.emit(userId, "nextStep");

    expect(spyHandler1).toHaveBeenCalledTimes(1);
    expect(spyHandler2).toHaveBeenCalledTimes(1);
  });

  test("should unsubscribe the handlers from an event", () => {
    const handlers = {
      handler: () => 0,
    };

    const spyHandler = jest.spyOn(handlers, "handler");

    eventController.on(userId, "end", handlers.handler);
    eventController.emit(userId, "end");

    expect(spyHandler).toHaveBeenCalledTimes(1);

    eventController.unsubscribe(userId, "end", handlers.handler);
    eventController.emit(userId, "end");

    expect(spyHandler).toHaveBeenCalledTimes(1);
  });

  test("should throw error when emitting an event for nonexistent user", () => {
    expect(() => {
      eventController.emit(userId, "end");
    }).toThrowError();
  });

  test("should throw error when unsubscribing from an event for nonexistent user", () => {
    const handlers = {
      handler: () => 0,
    };

    expect(() => {
      eventController.unsubscribe(userId, "nextStep", handlers.handler);
    }).toThrowError();
  });
});

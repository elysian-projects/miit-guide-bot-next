import { defaultState } from "@/constants/state";
import { StoreController } from "@/controllers/storeController";
import { UserId } from "@/types/data";
import { beforeEach, describe, expect, test } from "@jest/globals";

// This must be `let` because we need to recreate it before each test case
let storeController = new StoreController();

const userId: UserId = "1";

beforeEach(() => {
  storeController = new StoreController();
});

describe("add/remove user", () => {
  test("should add user to the list", () => {
    storeController.addUser(userId);

    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});
  });

  test("should remove user from the list", () => {
    storeController.addUser(userId);
    storeController.removeUser(userId);

    expect(() => {
      storeController.getUserState(userId);
    }).toThrowError();
  });

  test("should throw an error on add if user with given id is already on the list", () => {
    storeController.addUser(userId);

    expect(() => {
      storeController.addUser(userId);
    }).toThrowError();
  });

  test("should throw an error on remove if user with given id is not found", () => {
    storeController.addUser(userId);

    // Add symbol to an id to make sure it doesn't exist on the list
    expect(() => {
      storeController.removeUser(userId + "2");
    }).toThrowError();
  });
});

import { StoreController } from "@/controllers/storeController";
import { User } from "@/controllers/userController";
import { describe, expect, test } from "@jest/globals";

const chatId = 1;

describe("creates and controls user storage", () => {
  test("should create a valid storage object", () => {
    const storeController = new StoreController();
    expect(storeController).toBeInstanceOf(StoreController);
  });

  test("should add/remove a user to/from the list", () => {
    const storeController = new StoreController();

    expect(storeController.userExists(chatId)).toBeFalsy();

    storeController.addUser(chatId);
    expect(storeController.userExists(chatId)).toBeTruthy();

    storeController.removeUser(chatId);
    expect(storeController.userExists(chatId)).toBeFalsy();
  });

  test("should get a valid user object from the storage", () => {
    const storeController = new StoreController();
    storeController.addUser(chatId);

    const user = storeController.getUser(chatId);
    expect(user).toBeInstanceOf(User);
    expect(user.id()).toBe(chatId);
  });

  test("should not throw errors on weird actions", () => {
    const storeController = new StoreController();

    storeController.addUser(chatId);
    expect(() => {
      storeController.addUser(chatId);
    }).not.toThrowError();

    storeController.removeUser(chatId);
    expect(() => {
      storeController.removeUser(chatId);
    }).not.toThrowError();
  });

  test("should throw an error if user does not exist", () => {
    const storeController = new StoreController();

    expect(() => {
      storeController.getUser(chatId);
    }).toThrowError();

    storeController.addUser(chatId);
    expect(() => {
      storeController.getUser(chatId);
    }).not.toThrowError();
  });
});

import { StoreController } from "@/controllers/storeController";
import { User } from "@/controllers/userController";
import { UserData } from "@/types/user";
import { describe, expect, test } from "@jest/globals";

const chatId1 = 1;
const chatId2 = 2;
const userData: UserData = {
  title: "Title 1", content: [
    {label: "Label 1", content: "Content 1", picture: "Picture 1"},
    {label: "Label 2", content: "Content 2", picture: "Picture 2"},
    {label: "Label 3", content: "Content 3", picture: "Picture 3"},
  ], step: 0
};

describe("creates and controls user storage", () => {
  test("should create a valid storage object", () => {
    const storeController = new StoreController();
    expect(storeController).toBeInstanceOf(StoreController);
  });

  test("should add/remove a user to/from the list", () => {
    const storeController = new StoreController();

    expect(storeController.userExists(chatId1)).toBeFalsy();

    storeController.addUser(chatId1);
    expect(storeController.userExists(chatId1)).toBeTruthy();

    storeController.removeUser(chatId1);
    expect(storeController.userExists(chatId1)).toBeFalsy();
  });

  test("should get a valid user object from the storage", () => {
    const storeController = new StoreController();
    storeController.addUser(chatId1);

    const user = storeController.getUser(chatId1);
    expect(user).toBeInstanceOf(User);
    expect(user.id()).toBe(chatId1);
  });

  test("user removal should not affect other users on the list", () => {
    const storeController = new StoreController();
    storeController.addUser(chatId1);
    storeController.addUser(chatId2);

    storeController.getUser(chatId1).setData(userData);
    storeController.getUser(chatId2).setData(userData);

    storeController.removeUser(chatId2);

    expect(() => {
      storeController.getUser(chatId1).nextStep();
    }).not.toThrowError();
  });

  test("should not throw errors on weird actions", () => {
    const storeController = new StoreController();

    storeController.addUser(chatId1);
    expect(() => {
      storeController.addUser(chatId1);
    }).not.toThrowError();

    storeController.removeUser(chatId1);
    expect(() => {
      storeController.removeUser(chatId1);
    }).not.toThrowError();
  });

  test("should throw an error if user does not exist", () => {
    const storeController = new StoreController();

    expect(() => {
      storeController.getUser(chatId1);
    }).toThrowError();

    storeController.addUser(chatId1);
    expect(() => {
      storeController.getUser(chatId1);
    }).not.toThrowError();
  });
});

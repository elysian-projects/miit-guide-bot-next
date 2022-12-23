import { defaultState } from "@/constants/state";
import { User } from "@/controllers/userController";
import { beforeEach, describe, expect, test } from "@jest/globals";

const userId = 0;
let userController: User;

beforeEach(() => {
  userController = new User(userId);
});

describe("get/set user state", () => {
  test("should return default state if no actions were taken", () => {
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState});
  });
});

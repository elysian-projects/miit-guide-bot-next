import { beforeEach, expect, test } from "@jest/globals";
import { defaultState } from "../../../src/constants/state";
import { StateController } from "../../../src/controllers/stateController";
import { UserId } from "../../../src/types/data";

const stateController = new StateController();

const userId: UserId = "0";

beforeEach(() => {
  stateController.resetUserData(userId);
});

test("should add user to the list", () => {
  stateController.addUser(userId);
  expect(stateController.getUserState(userId)).toBe({id: userId, ...defaultState});
});

test("should remove user to the list", () => {
  stateController.addUser(userId);
  stateController.removeUser(userId);

  expect(stateController.getUserState(userId)).toThrowError();
});

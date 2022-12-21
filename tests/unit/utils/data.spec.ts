import { User } from "@/controllers/userController";
import { locations } from "@/env";
import { StorageState } from "@/types/data";
import { isLocationValid, removeUserFromList } from "@/utils/data";
import { describe, expect, test } from "@jest/globals";

describe("check location", () => {
  test("should return true if location is correct", () => {
    expect(isLocationValid(locations.street.value)).toBe(true);
    expect(isLocationValid(locations.street.label)).toBe(true);
  });

  test("should return false if location is not correct", () => {
    expect(isLocationValid("SOMELOCATION")).toBe(false);
    expect(isLocationValid("location")).toBe(false);
  });
});

describe("delete user from the list", () => {
  test("should delete user with given id from the list", () => {
    const userList: StorageState = {
      "0": new User("0")
    };

    expect(removeUserFromList(userList, "0")).toStrictEqual({});
  });
});

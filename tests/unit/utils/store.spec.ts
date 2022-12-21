import { defaultLocation } from "@/constants/state";
import { User } from "@/controllers/userController";
import { LocationType, StorageState, UserId } from "@/types/data";
import { isLocationChosen, userExists } from "@/utils/store";
import { describe, expect, test } from "@jest/globals";

describe("check if a user with given id is on the list", () => {
  test("should return true when id is on the list", () => {
    const userId: UserId = "0";

    const userStorage: StorageState = {
      [userId]: new User(userId)
    };

    expect(userExists(userStorage, userId)).toBe(true);
  });

  test("should return false when id is NOT on the list", () => {
    const userIdOnTheList: UserId = "0";
    const userIdNotOnTheList: UserId = "1";

    const userStorage: StorageState = {
      [userIdOnTheList]: new User(userIdOnTheList)
    };

    expect(userExists(userStorage, userIdNotOnTheList)).toBe(false);
  });
});

describe("check if location is chosen", () => {
  test("should return true when location is chosen", () => {
    // This value is not correct but it's not the default one
    const location: LocationType = {
      value: "value",
      label: "label",
    };

    expect(isLocationChosen(location)).toBe(true);
  });

  test("should return false when location is not chosen", () => {
    const location: LocationType = {...defaultLocation};

    expect(isLocationChosen(location)).toBe(false);
  });
});

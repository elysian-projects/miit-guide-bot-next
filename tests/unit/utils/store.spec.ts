import { defaultLocation } from "@/constants/state";
import { User } from "@/controllers/userController";
import { locations } from "@/env";
import { LocationPoint, LocationType } from "@/types/location";
import { StorageState } from "@/types/store";
import { UserId } from "@/types/user";
import { isLocationChosen, isUserPropValueValid, userExists } from "@/utils/store";
import { describe, expect, test } from "@jest/globals";

const newPointsList: LocationPoint[] = [
  {name: "Location1", description: "Description for location1", picture: "some picture", links: ["link1", "link2", "link3"]},
  {name: "Location2", description: "Description for location2", picture: "other picture", links: ["link1", "link2", "link3"]}
];

describe("check if a user with given id is on the list", () => {
  test("should return true when id is on the list", () => {
    const userId: UserId = 0;

    const userStorage: StorageState = {
      [userId]: new User(userId)
    };

    expect(userExists(userStorage, userId)).toBe(true);
  });

  test("should return false when id is NOT on the list", () => {
    const userIdOnTheList: UserId = 0;
    const userIdNotOnTheList: UserId = 1;

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

describe("check if a user prop value is valid", () => {
  test("should return true when user prop value is valid", () => {
    expect(isUserPropValueValid("location", locations.street)).toBe(true);
    expect(isUserPropValueValid("location", locations.building1)).toBe(true);

    expect(isUserPropValueValid("locationPoints", newPointsList)).toBe(true);
  });

  test("should return false when user prop value is not valid", () => {
    expect(isUserPropValueValid("location", {value: "invalid", label: "invalid"})).toBe(false);
    expect(isUserPropValueValid("location", defaultLocation)).toBe(false);

    expect(isUserPropValueValid("locationPoints", [])).toBe(false);
  });
});

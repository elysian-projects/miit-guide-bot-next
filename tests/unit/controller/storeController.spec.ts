import { defaultState } from "@/constants/state";
import { StoreController } from "@/controllers/storeController";
import { locations } from "@/env";
import { LocationPoint, LocationType, UserId } from "@/types/data";
import { beforeEach, describe, expect, test } from "@jest/globals";

let storeController: StoreController;

const userId: UserId = 1;
const newLocation: LocationType = {...locations.street};
const newPointsList: LocationPoint[] = [
  {name: "Location1", description: "Description for location1", picture: "some picture", links: ["link1", "link2", "link3"]},
  {name: "Location2", description: "Description for location2", picture: "other picture", links: ["link1", "link2", "link3"]}
];

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
      storeController.removeUser(userId + 2);
    }).toThrowError();
  });
});

describe("get/set state", () => {
  test("should return valid user state", () => {
    storeController.addUser(userId);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});

    const newUserId = userId + 2;

    storeController.addUser(newUserId);
    expect(storeController.getUserState(newUserId)).toStrictEqual({id: newUserId, ...defaultState});
  });

  test("should throw an error when trying to get state of nonexistent user", () => {
    expect(() => {
      storeController.getUserState(userId);
    }).toThrowError();

    storeController.addUser(userId);
    storeController.removeUser(userId);

    expect(() => {
      storeController.getUserState(userId);
    }).toThrowError();
  });

  test("should update location for given id", () => {
    storeController.addUser(userId);

    storeController.updateLocation(userId, newLocation);

    expect(storeController.getUserState(userId).location).toStrictEqual({...newLocation});
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, location: newLocation});
  });

  test("should update points list for given id", () => {
    storeController.addUser(userId);

    storeController.updatePointsList(userId, newPointsList);

    expect(storeController.getUserState(userId).locationPoints).toStrictEqual([...newPointsList]);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should throw error when passing invalid location object", () => {
    storeController.addUser(userId);

    expect(() => {
      storeController.updateLocation(userId, {value: "invalid", label: "invalid"});
    }).toThrowError();
  });

  test("should increase `step` by one", () => {
    storeController.addUser(userId);
    storeController.updatePointsList(userId, newPointsList);

    expect(storeController.getUserState(userId).step).toBe(0);

    storeController.nextStep(userId);
    expect(storeController.getUserState(userId).step).toBe(1);

    storeController.nextStep(userId);
    storeController.nextStep(userId);
    expect(storeController.getUserState(userId).step).toBe(3);
  });

  test("should reset user state to default", () => {
    storeController.addUser(userId);
    storeController.updateLocation(userId, newLocation);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, location: newLocation});

    storeController.resetUserState(userId);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});
  });
});

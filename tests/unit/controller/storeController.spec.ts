import { defaultState } from "@/constants/state";
import { StoreController } from "@/controllers/storeController";
import { eventController, locations } from "@/env";
import { LocationPoint, LocationType } from "@/types/location";
import { UserId } from "@/types/user";
import { describe, expect, jest, test } from "@jest/globals";

const userId: UserId = 1;
const newLocation: LocationType = {...locations.street};
const newPointsList: LocationPoint[] = [
  {name: "Location1", description: "Description for location1", picture: "some picture", links: ["link1", "link2", "link3"]},
  {name: "Location2", description: "Description for location2", picture: "other picture", links: ["link1", "link2", "link3"]},
  {name: "Location3", description: "Description for location3", picture: "another picture", links: ["link1", "link2", "link3"]}
];

// This MUST BE first
describe("emits event", () => {
  test("should increase `step` by one", () => {
    const storeController = new StoreController();

    const handlers = {
      onEnd: () => 0
    };

    const handlerSpy = jest.spyOn(handlers, "onEnd");

    eventController.on(userId, "end", handlers.onEnd);

    storeController.addUser(userId);
    storeController.updatePointsList(userId, newPointsList);

    expect(storeController.getUserState(userId).step).toBe(0);

    // Triggers "end" event
    storeController.nextStep(userId);
    expect(storeController.getUserState(userId).step).toBe(1);

    storeController.nextStep(userId);
    expect(handlerSpy).toBeCalledTimes(1);

    eventController.unsubscribe(userId, "end", handlers.onEnd);
  });

  test("should decrease `step` by one", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);
    storeController.updatePointsList(userId, newPointsList);

    expect(storeController.getUserState(userId).step).toBe(0);

    storeController.nextStep(userId);
    expect(storeController.getUserState(userId).step).toBe(1);

    storeController.prevStep(userId);
    expect(storeController.getUserState(userId).step).toBe(0);

    // Nothing changed
    storeController.prevStep(userId);
    expect(storeController.getUserState(userId).step).toBe(0);
  });
});



describe("add/remove user", () => {
  test("should add user to the list", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);

    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});
  });

  test("should remove user from the list", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);
    storeController.removeUser(userId);

    expect(() => {
      storeController.getUserState(userId);
    }).toThrowError();
  });

  test("should throw an error on add if user with given id is already on the list", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);

    expect(() => {
      storeController.addUser(userId);
    }).toThrowError();
  });

  test("should throw an error on remove if user with given id is not found", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);

    // Add symbol to an id to make sure it doesn't exist on the list
    expect(() => {
      storeController.removeUser(userId + 2);
    }).toThrowError();
  });
});

describe("get/set state", () => {
  test("should return valid user state", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});

    const newUserId = userId + 2;

    storeController.addUser(newUserId);
    expect(storeController.getUserState(newUserId)).toStrictEqual({id: newUserId, ...defaultState});
  });

  test("should return `true` if user is on the list", () => {
    const storeController = new StoreController();

    expect(storeController.userExists(userId)).toBe(false);

    storeController.addUser(userId);
    expect(storeController.userExists(userId)).toBe(true);

    storeController.removeUser(userId);
    expect(storeController.userExists(userId)).toBe(false);
  });

  test("should throw an error when trying to get state of nonexistent user", () => {
    const storeController = new StoreController();

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
    const storeController = new StoreController();

    storeController.addUser(userId);

    storeController.updateLocation(userId, newLocation);

    expect(storeController.getUserState(userId).location).toStrictEqual({...newLocation});
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, location: newLocation});
  });

  test("should update points list for given id", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);

    storeController.updatePointsList(userId, newPointsList);

    expect(storeController.getUserState(userId).locationPoints).toStrictEqual([...newPointsList]);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should throw error when passing invalid location object", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);

    expect(() => {
      storeController.updateLocation(userId, {value: "invalid", label: "invalid"});
    }).toThrowError();
  });

  test("should reset user state to default", () => {
    const storeController = new StoreController();

    storeController.addUser(userId);
    storeController.updateLocation(userId, newLocation);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState, location: newLocation});

    storeController.resetUserState(userId);
    expect(storeController.getUserState(userId)).toStrictEqual({id: userId, ...defaultState});
  });
});

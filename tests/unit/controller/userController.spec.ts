import { defaultState } from "@/constants/state";
import { User } from "@/controllers/userController";
import { locations } from "@/env";
import { LocationPoint } from "@/types/data";
import { beforeEach, describe, expect, test } from "@jest/globals";

const userId = 0;
let userController: User;

const newPointsList: LocationPoint[] = [
  {name: "Location1", description: "Description for location1", picture: "some picture", links: ["link1", "link2", "link3"]},
  {name: "Location2", description: "Description for location2", picture: "other picture", links: ["link1", "link2", "link3"]}
];

beforeEach(() => {
  userController = new User(userId);
});

describe("get/set user state", () => {
  test("should return default state if no actions were taken", () => {
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState});
  });

  test("should set `location` prop", () => {
    userController.setLocation(locations.street);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});
  });

  test("should set `pointsList` prop", () => {
    userController.setPointsList(newPointsList);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should throw error on setting invalid `location` prop", () => {
    userController.setLocation(locations.street);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});

    expect(() => {
      userController.setLocation({value: "invalid", label: "invalid"});
    }).toThrowError();

    // Make sure nothing changed
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});
  });

  test("should throw error on setting invalid `pointsList` prop", () => {
    userController.setPointsList(newPointsList);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});

    expect(() => {
      userController.setPointsList([]);
    }).toThrowError();

    // Make sure nothing changed
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should increment `step`", () => {
    userController.setPointsList(newPointsList);
    expect(userController.getState().step).toStrictEqual(0);

    userController.nextStep();
    expect(userController.getState().step).toStrictEqual(0);
  });

  test("should throw an error if no points list is provided", () => {
    expect(() => {
      userController.nextStep();
    }).toThrowError();
  });
});

import { defaultState } from "@/constants/state";
import { User } from "@/controllers/userController";
import { locations } from "@/env";
import { LocationPoint } from "@/types/location";
import { describe, expect, test } from "@jest/globals";

const userId = 0;

const newPointsList: LocationPoint[] = [
  {name: "Location1", description: "Description for location1", picture: "some picture", links: ["link1", "link2", "link3"]},
  {name: "Location2", description: "Description for location2", picture: "other picture", links: ["link1", "link2", "link3"]},
  {name: "Location3", description: "Description for location3", picture: "another picture", links: ["link1", "link2", "link3"]}
];

describe("get/set user state", () => {
  test("should return default state if no actions were taken", () => {
    const userController = new User(userId);

    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState});
  });

  test("should set `location` prop", () => {
    const userController = new User(userId);

    userController.setLocation(locations.street);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});
  });

  test("should set `pointsList` prop", () => {
    const userController = new User(userId);

    userController.setPointsList(newPointsList);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should throw error on setting invalid `location` prop", () => {
    const userController = new User(userId);

    userController.setLocation(locations.street);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});

    expect(() => {
      userController.setLocation({value: "invalid", label: "invalid"});
    }).toThrowError();

    // Make sure nothing changed
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, location: locations.street});
  });

  test("should throw error on setting invalid `pointsList` prop", () => {
    const userController = new User(userId);

    userController.setPointsList(newPointsList);
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});

    expect(() => {
      userController.setPointsList([]);
    }).toThrowError();

    // Make sure nothing changed
    expect(userController.getState()).toStrictEqual({id: userId, ...defaultState, locationPoints: newPointsList});
  });

  test("should increment `step`", () => {
    const userController = new User(userId);

    userController.setPointsList(newPointsList);
    expect(userController.getState().step).toStrictEqual(0);

    userController.nextStep();
    expect(userController.getState().step).toStrictEqual(1);
  });

  test("should decrement `step`", () => {
    const userController = new User(userId);

    userController.setPointsList(newPointsList);
    expect(userController.getState().step).toStrictEqual(0);

    userController.nextStep();
    expect(userController.getState().step).toStrictEqual(1);

    userController.prevStep();
    expect(userController.getState().step).toStrictEqual(0);

    // Nothing changed if the step value is 0
    userController.prevStep();
    expect(userController.getState().step).toStrictEqual(0);
  });

  test("should throw an error on `nextStep` if no points list is provided", () => {
    const userController = new User(userId);

    expect(() => {
      userController.nextStep();
    }).toThrowError();
  });

  test("should throw an error on `prevStep` if no points list is provided", () => {
    const userController = new User(userId);

    expect(() => {
      userController.prevStep();
    }).toThrowError();
  });
});

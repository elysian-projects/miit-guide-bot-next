import { locations } from "@/env";
import { isLocationValid } from "@/validations/state";
import { describe, expect, test } from "@jest/globals";

describe("check location", () => {
  test("should return true if location is correct", () => {
    expect(isLocationValid(locations.street)).toBe(true);
    expect(isLocationValid(locations.building1)).toBe(true);
  });

  test("should return false if location is not correct", () => {
    expect(isLocationValid({value: "something", label: "wrong"})).toBe(false);
    expect(isLocationValid({value: locations.street.value, label: "wrong"})).toBe(false);
    expect(isLocationValid({value: "something", label: locations.street.label})).toBe(false);
  });
});

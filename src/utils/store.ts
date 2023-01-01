import { defaultLocation } from "@/constants/state";
import { LocationPoint, LocationType } from "@/types/location";
import { StorageState } from "@/types/store";
import { UserId, UserProps } from "@/types/user";
import { isLocationValid, isPointsListValid } from "@/validations/state";

export const userExists = (userList: StorageState, userId: UserId): boolean => {
  return Object.keys(userList).includes(userId.toString());
};

export const isLocationChosen = (location: LocationType): boolean => {
  return (location.value !== defaultLocation.value) && (location.label !== defaultLocation.label);
};

export const isUserPropValueValid = <T extends keyof UserProps, K extends UserProps[T]>(prop: T, data: K) => {
  const validations: {[key in keyof UserProps]: (data: K) => boolean} = {
    location: (value: K) => isLocationValid(value as LocationType),
    locationPoints: (value: K) => isPointsListValid(value as LocationPoint[])
  };

  return validations[prop](data);
};

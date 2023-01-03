import { LocationType } from "@/types/location";
import { UserData, UserState, UserStatus } from "@/types/user";

export const defaultLocation: LocationType = {value: "unknown", label: "unknown"};

export const defaultUserData: UserData = {
  title: "",
  content: [],
  step: 0
};

export const defaultUserState: Omit<UserState, "id"> = {
  status: UserStatus.MAIN_HUB,
  data: defaultUserData
};

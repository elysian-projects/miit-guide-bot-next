import { Image } from "@/types/common";
import { UserData, UserState, UserStatus } from "@/types/user";

export const defaultLocation: Image = {value: "unknown", label: "unknown"};

export const defaultUserData: UserData = {
  title: "",
  content: [],
  step: 0
};

export const defaultUserState: Omit<UserState, "id"> = {
  status: UserStatus.MAIN_HUB,
  data: defaultUserData
};

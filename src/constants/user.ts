import { Image } from "@/types/lib";
import { UserData, UserState } from "@/types/user";

export const defaultLocation: Image = {value: "unknown", label: "unknown"};

export const defaultUserData: UserData = {
  title: "",
  content: [],
  step: 0
};

export const defaultUserState: Omit<UserState, "id"> = {
  data: defaultUserData
};

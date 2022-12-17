import { LocationType, StorageState } from "@/types/data";

export const initialState: StorageState = {};

export default {
  DEFAULT_LOCATION: {value: "unknown", label: "unknown"} satisfies LocationType,
  DEFAULT_CURRENT_STEP: 0,
};

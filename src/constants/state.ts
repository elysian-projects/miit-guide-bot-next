import { LocationData, LocationList } from "@/types/data";

export default {
  DEFAULT_LOCATION: "unknown" as keyof LocationList,
  DEFAULT_CURRENT_STEP: 0,
  DEFAULT_LOCATION_DATA: {
    name: "unknown",
    description: "unknown",
    picture: "",
    links: []
  } as LocationData
};

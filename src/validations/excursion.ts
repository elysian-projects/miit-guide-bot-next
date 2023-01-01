import { locations } from "@/env";

export const isValidLocation = (location: string): boolean => {
  return Object.keys(locations).includes(location);
};

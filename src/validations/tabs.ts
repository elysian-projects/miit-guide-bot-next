import { tabs } from "@/env";

export const isValidTab = (tab: string): boolean => {
  return Object.keys(tabs).includes(tab);
};

import { ButtonImage } from "@/types/lib";
import { Tabs } from "@/types/tabs";

export const createButtonsFromTabs = (tabs: Tabs): ButtonImage[] => {
  return Object.keys(tabs).map(key => ({label: tabs[key].label, value: key}));
};

import { tabsData } from "@/env";
import { Tab, TabsList } from "@/types/tabs";

export const getTabData = (tabValue: TabsList): Tab => {
  return tabsData[tabValue];
};

import { tabsData } from "@/env";
import { StaticImplements } from "@/types/common";
import { IExternalEntityController } from "@/types/controllers";
import { getImageLabelByValue } from "../utils";
import { Tab, TabImage, TabsList } from "./types";

const tabsImage: TabImage[] = [
  {value: "excursion", label: "Экскурсия"},
  {value: "ww2", label: "МИИТ в годы ВОВ"},
];

@StaticImplements<IExternalEntityController<TabsList, TabImage>>()
export class TabsController {
  public static getLabels = (): string[] => {
    return tabsImage.map(tab => tab.label);
  };

  public static getValues = (): TabsList[] => {
    return tabsImage.map(tab => tab.value);
  };

  public static getImages = (): TabImage[] => {
    return [...tabsImage];
  };

  public static getLabelByValue = (value: TabsList): string => {
    return getImageLabelByValue(tabsImage, value);
  };

  public static getTabData = (tab: TabsList): Tab => {
    return tabsData[tab];
  };
}
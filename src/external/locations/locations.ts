import { StaticImplements } from "@/types/common";
import { IExternalEntityController } from "@/types/controllers";
import { getImageLabelByValue } from "../utils";
import { LocationImage, LocationsList } from "./types";

export const locationsImages: LocationImage[] = [
  {value: "street", label: "Улица"},
  {value: "building1", label: "Корпус 1"}
];

@StaticImplements<IExternalEntityController<LocationsList, LocationImage>>()
export class LocationsController {
  public static getLabels = (): string[] => {
    return locationsImages.map(location => location.label);
  };

  public static getValues = (): LocationsList[] => {
    return locationsImages.map(location => location.value);
  };

  public static getImages = (): LocationImage[] => {
    return [...locationsImages];
  };

  public static getLabelByValue = (value: LocationsList): string => {
    return getImageLabelByValue(locationsImages, value);
  };
}
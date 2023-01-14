import { Image } from "@/types/common";

export const getImageLabelByValue = <T extends Image[], K extends string>(imageList: T, value: K): string => {
  return imageList.filter(image => image.value === value)[0].label;
};
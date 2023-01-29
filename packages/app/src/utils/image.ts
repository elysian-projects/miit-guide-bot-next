import { Image } from "@/types/lib";

export const extractFromImages = (images: Image[], prop: keyof Image): string[] => {
  return Object.values(images).map(image => image[prop]);
};

export const getLabelByValue = (images: Image[], value: string): string => {
  for(const image of images) {
    if(image.value === value) {
      return image.label;
    }
  }

  throw new Error(`Invalid value: ${value} was given and could not be found in the image list!`);
};

import { KeyboardButtons } from "@/constants/buttons";
import { locationsImage } from "@/env";
import { ContentNode } from "@/types/content";
import { LocationImage } from "@/types/location";
import { getObjectPropArray } from "@/utils/common";

export const isValidLocation = (candidate: LocationImage): boolean => {
  return (getObjectPropArray(Object.values(locationsImage), "label").includes(candidate.label))
      && (getObjectPropArray(Object.values(locationsImage), "value").includes(candidate.value));
};

export const isValidContentList = (candidate: ContentNode[]): boolean => {
  return (candidate.length > 0);
};

export const isValidControlButton = (candidate: string) => {
  return Object.values(KeyboardButtons).map(button => button.label).includes(candidate)
      || Object.keys(KeyboardButtons).includes(candidate);
};

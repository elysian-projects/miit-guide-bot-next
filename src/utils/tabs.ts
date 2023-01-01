import { ButtonImage } from "@/types/lib";

export const createButtonImages = <T extends {label: string}>(source: Record<string, T>): ButtonImage[] => {
  return Object.keys(source).map(key => ({label: source[key].label, value: key}));
};

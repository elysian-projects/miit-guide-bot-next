import { Image } from "@/types/lib";

/**
 * Returns `true` if the given array of objects contains all of the required properties
 * to be considered as array of images, and `false` otherwise.
 *
 * @param {object[] | undefined} data unknown array of objects or undefined
 * @return {boolean} data is Image[]
 */
export const isValidImage = (data: object[] | undefined): data is Image[] => {
  if(!data) {
    return false;
  }

  let foundInvalid = false;

  data.forEach(item => {
    if(!item["value" as keyof object] || !item["label" as keyof object]) {
      foundInvalid = true;
      return;
    }
  });

  return !foundInvalid;
};

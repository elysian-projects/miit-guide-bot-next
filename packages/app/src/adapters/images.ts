import { Image } from "@/types/lib";

/**
 * Computes data received from the table `tabs` in the database and makes an array of images out of it
 *
 * @deprecated do I really need this? seems weird
 * @param {object[]} data - data from the table `tabs`
 * @returns {Image[]}
 */
// FIXME: maybe replace it with a validator?
export const imageAdapter = <T extends Image>(data: T[]): Image[] => {
  const images: Image[] = [];

  for(const row of data) {
    if(Object.hasOwn(row, "value") && Object.hasOwn(row, "value")) {
      images.push({
        value: row.value,
        label: row.label,
      });
    } else {
      throw new Error("Invalid data!");
    }
  }

  return images;
};

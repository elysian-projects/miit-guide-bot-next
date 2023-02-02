import { Image } from "@/types/lib";

/**
 * Computes data received from the table `tabs` in the database and makes an array of images out of it
 *
 * @param {object[]} data - data from the table `tabs`
 * @returns {Image[]}
 */
export const imageAdapter = (data: object[]): Image[] => {
  const images: Image[] = [];

  for(const row of data) {
    if(Object.hasOwn(row, "tab_value") && Object.hasOwn(row, "tab_label")) {
      images.push({
        value: row["tab_value" as unknown as keyof typeof row],
        label: row["tab_label" as unknown as keyof typeof row],
      });
    }
  }

  return images;
};

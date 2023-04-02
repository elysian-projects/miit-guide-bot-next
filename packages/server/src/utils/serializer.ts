import { cyrillicToLatinMapper, MAX_KEYBOARD_VALUE_SIZE_IN_BYTES } from "@/constants/serializer";

/**
 * Takes a string and converts it to a shorter lowercase latin string with no spaces that can be used as a unique value.
 * Translation to latin help to save memory as characters are encoded with fewer amount of bytes. This is required
 * as Telegram's keyboard `value` must be `1-64 bytes`.
 *
 * @param {string} tabLabel - string to convert
 * @returns {string} serialized string
 */
export const serializeTabLabel = (tabLabel: string): string => {
  let result = "";

  const normalizedString = String(tabLabel).trim().toLowerCase().replaceAll(" ", "_");

  for(const char of normalizedString) {
    result += cyrillicToLatinMapper[char] || char;

    // Avoiding Telegram keyboard value maximum size overflow
    if(getSizeInBytes(result) === MAX_KEYBOARD_VALUE_SIZE_IN_BYTES) {
      break;
    }
  }

  return result;
};

/**
 * Takes an object which satisfies the type `Record<string, string>` and decodes its values with URI decoder.
 * This function may be used to decode query parameters object with is translated with the network using HTTP requests
 *
 * @param {Record<string, string>} object - the object to be decoded
 * @returns {Record<string, string>} object with the same keys and decoded values
 */
// TODO: find a better way to do this, it doesn't look nice :(
export const decodeObjectValues = <T extends Record<string, string>>(object: T): T => {
  const decodedAsArray = Object.create(Object.keys(object).map((key) => ({[key]: decodeURI(object[key])})));

  let decodedObject = {};

  for(const item of decodedAsArray) {
    decodedObject = {...decodedObject, ...item};
  }

  return decodedObject as T;
};

const getSizeInBytes = (value: string): number => {
  return (new TextEncoder().encode(value)).length;
};

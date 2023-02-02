/**
 * Takes a string and converts it to a lowercase string with no spaces that can be used as a unique value
*
* @param {string} tabLabel - string to convert
* @returns {string} serialized string
*/
// FIXME: maybe transformation from cyrillic to latin should be added here
export const serializeTabLabel = (tabLabel: string): string => {
  return String(tabLabel).toLowerCase().trim().replaceAll(" ", "_");
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

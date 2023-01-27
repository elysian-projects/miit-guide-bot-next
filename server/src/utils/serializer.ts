export const serializeTabLabel = (tabLabel: string): string => {
  return String(tabLabel).toLowerCase().replace(" ", "_");
};

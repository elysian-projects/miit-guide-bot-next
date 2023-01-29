export const serializeTabLabel = (tabLabel: string): string => {
  return String(tabLabel).toLowerCase().trim().replaceAll(" ", "_");
};

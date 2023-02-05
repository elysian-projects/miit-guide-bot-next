import { CHANGE, columnNamesDict, DELETE } from "../constants/table";

type AdditionalColumns = {
  addChange?: boolean,
  addDelete?: boolean
}

export const getTableColumnNames = (data: object, options?: AdditionalColumns): string[] => {
  const columnNames: string[] = [];

  Object.keys(data ?? []).forEach(key => {
    columnNames.push(formatLabelForUI(key));
  });

  const {addChange, addDelete} = options ?? {};

  addChange && columnNames.push(CHANGE);
  addDelete && columnNames.push(DELETE);

  return columnNames;
}

export const formatLabelForUI = (columnName: string): string => {
  if(!columnName) {
    return "";
  }

  return columnNamesDict[columnName] ?? columnName;
}

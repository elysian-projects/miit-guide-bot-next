import { DropResult } from "react-beautiful-dnd";

export const reorderList = <T>(ctx: DropResult, list: T[]): T[] => {
  const source = ctx.source;
  const destination = ctx.destination;

  if(!source || !destination || destination.index === source.index) {
    return list;
  }

  const item = list[source.index];
  const result: T[] = [...list];

  result.splice(source.index, 1);
  result.splice(destination.index, 0, item);

  return result;
};

import { Pagination } from "@/components/control-flow";
import { IControlFlow } from "@/components/control-flow/types";

export const getChatControlFlow = (): IControlFlow => {
  return new Pagination();
};

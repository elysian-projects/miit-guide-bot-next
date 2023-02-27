import { TabNode } from "common/src";
import { createErrorResponse, createSuccessResponse, FormValidationResponse } from "../../../articles";

export const validateTabForm = (form: TabNode): FormValidationResponse => {
  if(form.label.trim().length === 0) {
    return createErrorResponse("Необходимо заполнить название вкладки!");
  }

  if(form.type !== "article" && form.type !== "location") {
    return createErrorResponse("Указан неверный тип!");
  }

  return createSuccessResponse("Данные успешно сохранены!");
};

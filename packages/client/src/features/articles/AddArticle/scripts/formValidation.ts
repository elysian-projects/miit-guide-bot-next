import { ContentNode, FlatContent, isValidURL } from "common/src";

export type FormValidationResponse = {
  ok: boolean,
  message: string
}

export const validateArticleForm = (form: ContentNode<FlatContent>): FormValidationResponse => {
  if(form.label.trim().length === 0) {
    return createErrorResponse("Заполните название статьи!");
  }

  if(form.type !== "article" && form.type !== "location") {
    return createErrorResponse("Укажите тип статьи!");
  }

  if(form.content.trim().length <= 10) {
    return createErrorResponse("Длина статьи не может быть менее 10 символов!");
  }

  if(form.picture.length === 0 || !isValidURL(form.picture)) {
    return createErrorResponse("Ссылка на фотографию введена неверно!");
  }

  if(!form.tabId || form.tabId < 0) {
    return createErrorResponse("Указана неверная вкладка!");
  }

  return createSuccessResponse("Данные успешно сохранены!");
};

export const createErrorResponse = (message: string): FormValidationResponse => {
  return {
    ok: false,
    message
  };
};

export const createSuccessResponse = (message: string): FormValidationResponse => {
  return {
    ok: true,
    message
  };
};

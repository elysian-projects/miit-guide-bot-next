import { ContentNode, FlatContent } from "common/src";
import { FC, FormEventHandler, useState } from "react";
import { ArticleForm, defaultFormState } from "../../../widgets/ArticleForm";

export type ArticleFormContentNode = Omit<ContentNode<FlatContent>, "id">;

export const AddArticleForm: FC = () => {
  const [formState, setFormState] = useState<ArticleFormContentNode>(defaultFormState);

  const onSubmit: FormEventHandler = () => {
    console.log(formState);
  };

  return (
    <ArticleForm
      onUpdate={setFormState}
      onSubmit={onSubmit}
    />
  );
};

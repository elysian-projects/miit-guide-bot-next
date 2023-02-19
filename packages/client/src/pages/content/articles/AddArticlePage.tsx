import { ContentNode, FlatContent } from "common/src";
import { FC, FormEventHandler, useState } from "react";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { ArticleForm } from "./ArticleForm";
import { defaultFormState } from "./constants";

export type ArticleFormContentNode = Omit<ContentNode<FlatContent>, "id">;

export const AddArticlePage: FC = () => {
  const [formState, setFormState] = useState<ArticleFormContentNode>(defaultFormState);

  const onSubmit: FormEventHandler = () => {
    console.log(formState);
  }

  return (
    <div>
      <PageTitleBlock
        title="Добавить статью"
        linkTitle="Назад"
        href="/content/articles"
      />
      <ArticleForm
        onUpdate={setFormState}
        onSubmit={onSubmit}
      />
    </div>
  )
}

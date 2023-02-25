import { FC } from "react";
import { AddArticleForm } from "../../../features/articles";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const AddArticlePage: FC = () => (
  <div>
    <PageTitleBlock
      title="Добавить статью"
      linkTitle="Назад"
      href="/content/articles"
    />
    <AddArticleForm />
  </div>
);

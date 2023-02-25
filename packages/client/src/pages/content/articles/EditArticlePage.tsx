import { FC } from "react";
import { EditArticleForm } from "../../../features/articles";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const EditArticlePage: FC = () => (
  <>
    <PageTitleBlock
      title="Редактировать статью"
      linkTitle="Назад"
      href="/content/articles"
    />
    <EditArticleForm />
  </>
);

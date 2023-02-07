import { FC } from "react";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { ArticleForm } from "./ArticleForm";

export const AddArticlePage: FC = () => {
  return (
    <div>
      <PageTitleBlock
        title="Добавить статью"
        linkTitle="Назад"
        href="/content/articles"
      />
      <ArticleForm />
    </div>
  )
}

import { FC, useState } from "react";
import { AllArticles } from "../../../features/articles/";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const AllArticlesPage: FC = () => {
  const [badgeValue, setBadgeValue] = useState<number>(0);

  const getArticlesAmount = (amount: number) => {
    setBadgeValue(amount);
  };

  return (
    <>
      <PageTitleBlock
        title="Статьи"
        linkTitle="Добавить статью"
        href="/content/articles/add"
        badgeContent={badgeValue}
      />
      <AllArticles getArticlesAmount={getArticlesAmount} />
    </>
  );
};

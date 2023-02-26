import { FC } from "react";
import { AddTabForm } from "../../../features/tabs/AddTab/AddTab";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const AddTabPage: FC = () => {
  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Назад"
        href="/content/tabs"
      />
      <AddTabForm />
    </>
  );
};

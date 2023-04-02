import { FC } from "react";
import { EditTabIndex } from "../../../features/tabs/EditTab";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const EditTabPage: FC = () => {
  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Назад"
        href="/content/tabs"
      />
      <EditTabIndex />
    </>
  );
};

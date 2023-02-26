import { FC } from "react";
import { EditTab } from "../../../features/tabs/EditTab/EditTab";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const EditTabPage: FC = () => {
  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Назад"
        href="/content/tabs"
      />
      <EditTab />
    </>
  );
};

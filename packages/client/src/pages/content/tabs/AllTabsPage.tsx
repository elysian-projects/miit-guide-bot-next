import { FC, useState } from "react";
import { AllTabs } from "../../../features/tabs";
import { PageTitleBlock } from "../../../widgets/Page/PageTitleBlock";

export const AllTabsPage: FC = () => {
  const [badgeValue, setBadgeValue] = useState<number>(0);

  const getTabsAmount = (amount: number) => {
    setBadgeValue(amount);
  };

  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Добавить вкладку"
        href="/content/tabs/add"
        badgeContent={badgeValue}
      />
      <AllTabs getTabsAmount={getTabsAmount} />
    </>
  );
};

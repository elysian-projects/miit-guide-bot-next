import { Autocomplete, TextField } from "@mui/material";
import { ArticleType, TabNode } from "common/src";
import { FC, useEffect, useState } from "react";
import { getAllTabs } from "../../../api/tabs";
import { useHttp } from "../../../hooks/useHttp";


const defaultTab: TabNode = {
  id: -1,
  label: "Выберите вкладку",
  value: "chooseTab",
  type: "article"
};

interface IChooseTabProps {
  tabIdValue: number,
  onUpdate: (updatedTab: TabNode) => void,
  type: ArticleType,
}

export const ChooseTab: FC<IChooseTabProps> = ({
  onUpdate,
  type,
  tabIdValue
}) => {
  const [tabsList, setTabsList] = useState<TabNode[]>([]);

  const {response, refetch, isFetching} = useHttp<TabNode[]>("getAppropriateTabs", () => getAllTabs({
    type
  }));

  useEffect(() => {
    refetch();
  }, [type]);

  useEffect(() => {
    if(response?.ok && response.data) {
      setTabsList([defaultTab, ...response.data]);
    }
  }, [response]);

  const getChosenTab = (): TabNode => {
    return tabsList.find(tab => tab.id === tabIdValue) || defaultTab;
  };

  const handleTabChange = (updatedValue: string | null | undefined): void => {
    if(updatedValue !== defaultTab.label) {
      onUpdate(tabsList.find(tab => tab.label === updatedValue) || defaultTab);
    }
  };

  return (
    <Autocomplete
      id="tabsList"
      options={tabsList}
      getOptionLabel={tab => tab.label}
      loading={isFetching}
      value={getChosenTab()}
      inputValue={getChosenTab().label}
      onChange={(_, newValue: TabNode | null) => handleTabChange(newValue?.label)}
      renderInput={props => (
        <TextField
          {...props}
          placeholder="Выберите вкладку*"
        />
      )}
    />
  );
};

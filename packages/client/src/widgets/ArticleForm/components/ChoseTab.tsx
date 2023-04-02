import { Autocomplete, TextField } from "@mui/material";
import { TabNode } from "common/src";
import { FC, useEffect, useState } from "react";
import { getAllTabs } from "../../../features/tabs/api";
import { useHttp } from "../../../hooks/useHttp";

const defaultTab: TabNode = {
  id: -1,
  label: "Выберите вкладку",
  value: "chooseTab",
  type: "article"
};

const getInitialTab = (tabsList: TabNode[], id: number | string): string => {
  return tabsList.find(tab => tab.id === id)?.label || defaultTab.label;
};

interface IChooseTabProps {
  tabId: number,
  onUpdate: (updatedTab: TabNode) => void
}

export const ChooseTab: FC<IChooseTabProps> = ({
  onUpdate,
  tabId
}) => {
  const [tabsList, setTabsList] = useState<TabNode[]>([]);
  const {response, isFetching} = useHttp<TabNode[]>("getAllTabs", () => getAllTabs());
  const [inputValue, setInputValue] = useState<string>(getInitialTab(response?.data || [], tabId));

  useEffect(() => {
    if(response?.ok && response.data) {
      setTabsList([defaultTab, ...response.data]);
    }
  }, [response]);

  useEffect(() => {
    setInputValue(getInitialTab(tabsList, tabId));
  }, [tabsList]);

  const handleTabChange = (updatedValue: string | null | undefined): void => {
    if(updatedValue !== defaultTab.label) {
      setInputValue(updatedValue || getInitialTab(tabsList, tabId));
      onUpdate(tabsList.find(tab => tab.label === updatedValue) || defaultTab);
    }
  };

  return (
    <>
      <Autocomplete
        id="tabsList"
        options={tabsList.map(tab => tab.label)}
        loading={isFetching}
        value={inputValue}
        onChange={(_, newValue: string | null) => handleTabChange(newValue)}
        renderInput={props => (
          <TextField
            {...props}
            placeholder="Выберите вкладку*"
          />
        )}
      />
    </>
  );
};

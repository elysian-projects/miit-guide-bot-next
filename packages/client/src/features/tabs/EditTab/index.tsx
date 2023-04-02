import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { parseQueryNumber } from "../../../utils/parser";
import { EditTab } from "./EditTab";
import { TabArticles } from "./TabArticles";

export const EditTabIndex: FC = () => {
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<number | null>(parseQueryNumber(getQueryProp("id") || ""));
  const [activeTab, setActiveTab] = useState<string>("0");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Редактировать вкладку" value={"0"} />
          <Tab label="Изменить порядок статей" value={"1"} />
        </Tabs>
      </Box>
      <TabPanel sx={{p: "0", paddingTop: "10px"}} value={"0"}>
        <EditTab id={id || -1} />
      </TabPanel>
      <TabPanel sx={{p: "0"}} value={"1"}>
        <TabArticles tabId={id || -1} />
      </TabPanel>
    </TabContext>
  );
};

import { Alert, Card, CardContent } from "@mui/material";
import { TabNode } from "common/src";
import { FC, useEffect, useState } from "react";
import { CardWrapper } from "../../../components/card";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardTitle } from "../../../components/card/CardTitle";
import { useHttp } from "../../../hooks/useHttp";
import { ActionBar } from "../../../widgets/ActionBar/ActionBar";
import { filterSearch } from "../../../widgets/ActionBar/scripts";
import { getAllTabs } from "../api";
interface IAllTabsProps {
  getTabsAmount: (amount: number) => void,
}

export const AllTabs: FC<IAllTabsProps> = ({getTabsAmount}) => {
  const {error, response, status} = useHttp<TabNode[]>("getAllTabs", () => getAllTabs());
  const [data, setData] = useState<TabNode[] | null>(response?.data || null);

  useEffect(() => {
    setData(response?.data || null);
    getTabsAmount(response?.data?.length || 0);
  }, [response?.data]);

  const handleSearch = (value: string) => {
    if(data) {
      if(value.length === 0) {
        setData(response?.data || null);
        return;
      }

      setData(filterSearch(response?.data || [], tab => tab.label.toLowerCase().includes(value.toLowerCase().trim())));
    }
  };

  return <>
    {status === "loading" && (
      <Alert severity="info">Загрузка данных...</Alert>
    )}
    {status === "error" && (
      <Alert severity="error">{error}</Alert>
    )}
    {(status === "success" && data) && (
      <>
        <ActionBar
          reorderCallback={() => setData([...data].reverse())}
          searchCallback={handleSearch}
        />
        <CardWrapper view={"line"}>
          {data.map(item => (
            <Card key={item.id}>
              <CardContent>
                <CardTitle
                  value={item.label}
                  variant="body1"
                  noWrap={true}
                />
              </CardContent>
              <CardActionBar
                editLink={`/content/tabs/edit?id=${item.id}`}
                deleteLink={`/content/tabs/delete?id=${item.id}`}
              />
            </Card>
          ))}
        </CardWrapper>
      </>
    )}
  </>;
};

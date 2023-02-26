import { Alert, Card, CardContent } from "@mui/material";
import { TabNode } from "common/src";
import { FC, useEffect } from "react";
import { CardWrapper } from "../../../components/card";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardTitle } from "../../../components/card/CardTitle";
import { useHttp } from "../../../hooks/useHttp";
import { getAllTabs } from "../api";

interface IAllTabsProps {
  getTabsAmount: (amount: number) => void
}

export const AllTabs: FC<IAllTabsProps> = ({getTabsAmount}) => {
  const {error, response, status} = useHttp<TabNode[]>("getAllTabs", () => getAllTabs());

  useEffect(() => {
    getTabsAmount(response?.data?.length || 0);
  }, [response?.data]);

  return <>
    {status === "loading" && (
      <Alert severity="info">Загрузка данных...</Alert>
    )}
    {status === "error" && (
      <Alert severity="error">{error}</Alert>
    )}
    {(status === "success" && response) && (
      <CardWrapper>
        {response.data?.map(item => (
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
    )}
  </>;
};

import { Alert, Card, CardContent } from "@mui/material";
import { FC } from "react";
import { TabNode } from "../../../../../common/src";
import { getAllTabs } from "../../../api/tabs";
import { CardWrapper } from "../../../components/card/Card.styles";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardTitle } from "../../../components/card/CardTitle";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { useHttp } from "../../../hooks/useHttp";

export const AllTabsPage: FC = () => {
  const {error, response, status} = useHttp<TabNode[]>("getAllTabs", getAllTabs);

  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Добавить вкладку"
        href="/content/tabs/add"
        badgeContent={response?.data?.length}
      />
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
    </>
  )
}

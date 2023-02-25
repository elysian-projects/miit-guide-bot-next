import { Link as LinkIcon } from "@mui/icons-material";
import { Alert, Card, CardContent } from "@mui/material";
import { ContentNode } from "common/src";
import { FC, useEffect } from "react";
import { CardWrapper } from "../../../components/card";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardMediaCustom } from "../../../components/card/CardMediaCustom";
import { CardTitle } from "../../../components/card/CardTitle";
import { useHttp } from "../../../hooks/useHttp";
import { getAllArticles } from "../api";

interface IAllArticlesProps {
  getArticlesAmount?: (amount: number) => void
}

export const AllArticles: FC<IAllArticlesProps> = ({getArticlesAmount = () => 0}) => {
  const {response, status, error} = useHttp<ContentNode[]>("articlesPage", () => getAllArticles());

  useEffect(() => {
    getArticlesAmount(response?.data?.length || 0);
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
            <CardMediaCustom
              height="250"
              image={item.picture}
            />
            <CardContent>
              <CardTitle
                value={item.label}
                variant="body1"
                noWrap={true}
              />
            </CardContent>
            <CardActionBar
              additionalLinks={[{value: `/content/tabs/edit?id=${item.tabId}`, icon: <LinkIcon />, tip: "К вкладке"}]}
              editLink={`/content/articles/edit?id=${item.id}`}
              deleteLink={`/content/articles/delete?id=${item.id}`}
            />
          </Card>
        ))}
      </CardWrapper>
    )}
  </>;
};

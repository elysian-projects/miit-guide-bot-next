import { Link as LinkIcon } from "@mui/icons-material";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { CardWrapper } from "../../../components/card";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardMediaCustom } from "../../../components/card/CardMediaCustom";
import { CardTitle } from "../../../components/card/CardTitle";
import { useHttp } from "../../../hooks/useHttp";
import { formatDate } from "../../../utils/formatDate";
import { ActionBar } from "../../../widgets/ActionBar/ActionBar";
import { filterSearch } from "../../../widgets/ActionBar/scripts";
import { getAllArticles } from "../api";

interface IAllArticlesProps {
  getArticlesAmount?: (amount: number) => void
}

export const AllArticles: FC<IAllArticlesProps> = ({getArticlesAmount = () => 0}) => {
  const {response, status, error} = useHttp<ContentNode<FlatContent>[]>("articlesPage", () => getAllArticles());
  const [data, setData] = useState<ContentNode<FlatContent>[] | null>(response?.data || null);

  useEffect(() => {
    setData(response?.data || null);
    getArticlesAmount(response?.data?.length || 0);
  }, [response?.data]);

  const handleSearch = (value: string) => {
    if(data) {
      if(value.length === 0) {
        setData(response?.data || null);
        return;
      }

      setData(filterSearch(response?.data || [], article => article.label.toLowerCase().includes(value.toLowerCase().trim())));
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
        <CardWrapper>
          {data.map(item => (
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
                {item.addedOn && (
                  <Typography variant="body2" component="div">
                    Добавлено: {formatDate(item.addedOn)}
                  </Typography>
                )}
              </CardContent>
              <CardActionBar
                additionalLinks={[{value: `/content/tabs/edit?id=${item.tabId}`, icon: <LinkIcon />, tip: "К вкладке"}]}
                editLink={`/content/articles/edit?id=${item.id}`}
                deleteLink={`/content/articles/delete?id=${item.id}`}
              />
            </Card>
          ))}
        </CardWrapper>
      </>
    )}
  </>;
};

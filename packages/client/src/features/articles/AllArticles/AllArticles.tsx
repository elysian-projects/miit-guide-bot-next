import { Link as LinkIcon } from "@mui/icons-material";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardWrapper } from "../../../components/card";
import { CardActionBar } from "../../../components/card/CardActions";
import { CardMediaCustom } from "../../../components/card/CardMediaCustom";
import { CardTitle } from "../../../components/card/CardTitle";
import { PaginationBar } from "../../../components/pagination/PaginationBar";
import { useHttp } from "../../../hooks/useHttp";
import { usePagination } from "../../../hooks/usePagination";
import { formatDate } from "../../../utils/formatDate";
import { ActionBar } from "../../../widgets/ActionBar/ActionBar";
import { findArticleWithPropLike, getAllArticles } from "../api";

const BASE_URL = "/content/articles";

interface IAllArticlesProps {
  getArticlesAmount?: (amount: number) => void
}

export const AllArticles: FC<IAllArticlesProps> = ({getArticlesAmount = () => 0}) => {
  const location = useLocation();
  const pagination = usePagination(BASE_URL);

  const [message, setMessage] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const {response, status, error, refetch} = useHttp<ContentNode<FlatContent>[]>("articlesPage", () => {
    if(searchValue) {
      return findArticleWithPropLike({
        page: pagination.page,
        search: {key: "label", value: searchValue, registry: "articles"}
      });
    }

    return getAllArticles({
      page: pagination.page
    });
  });
  const [data, setData] = useState<ContentNode<FlatContent>[] | null>(response?.data || null);

  useEffect(() => {
    refetch();
    window.scrollTo({top: 0});
  }, [location, searchValue]);

  useEffect(() => {
    setData(response?.data || null);
    getArticlesAmount(response?.data?.length || 0);
  }, [response?.data]);

  const handleSearch = (value: string) => {
    if(value && value.length < 5) {
      setMessage("Длина запроса должна быть не менее 5 символов!");
      return;
    }

    setSearchValue(value);
  };

  return <>
    {message && (
      <Alert severity="info" onClose={() => setMessage(null)}>{message}</Alert>
    )}
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
                  value={item.label + " " + item.id}
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

        {data.length == 0 && (
          <div style={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h6">Ничего не найдено</Typography>
          </div>
        )}

        {response?.pagination?.pages && (
          <PaginationBar baseUrl={BASE_URL} count={response.pagination.pages || 1} />
        )}
      </>
    )}
  </>;
};

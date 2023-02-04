import { Alert, Typography } from "@mui/material";
import { getArticles } from "api/articles";
import { FC } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "../../../components/wrapper";

export const ArticlePage: FC = () => {
  const query = useQuery("articles", getArticles);

  console.log(query);

  return (
    <Wrapper>
      <Typography variant="h4">Статьи</Typography>

      {query.status === "loading" && (
        <Alert severity="info">Загрузка данных...</Alert>
      )}
      {query.status === "error" && (
        <Alert severity="error">Ошибка! Не удалось загрузить данные!</Alert>
      )}

      <div>
        {query.data?.map(item => (
          <div>{item.label}</div>
        ))}
      </div>
    </Wrapper>
  )
}

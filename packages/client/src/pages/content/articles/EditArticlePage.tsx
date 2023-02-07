import { Box, CircularProgress } from "@mui/material";
import { FC, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ContentNode, flattenContent } from "../../../../../common/src";
import { getOneArticle } from "../../../api/articles";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { useHttp } from "../../../hooks/useHttp";
import { ArticleForm } from "./ArticleForm";

export const EditArticlePage: FC = () => {
  const [queryProps] = useSearchParams();
  const [id] = useState<string>(queryProps.get("id") ?? "");

  const {response} = useHttp<ContentNode>("editArticle", async() => getOneArticle({id}));

  if(!queryProps.get("id")) {
    return <Navigate replace to="/content/articles" />
  }

  return (
    <>
      <PageTitleBlock
        title="Редактироваться статью"
        linkTitle="Назад"
        href="/content/articles"
      />
      {response ? (
        <ArticleForm data={{...response?.data, content: flattenContent(response?.data?.content)}} />
      ) : (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

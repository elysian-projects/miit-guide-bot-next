import { Box, CircularProgress } from "@mui/material";
import { ContentNode, flattenContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOneArticle } from "../../../api/articles";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { ArticleForm } from "./ArticleForm";

export const EditArticlePage: FC = () => {
  const [queryProps] = useSearchParams();
  const [id] = useState<string>(queryProps.get("id") ?? "");
  const {redirect} = useRedirect();

  const {response, error, status} = useHttp<ContentNode>("editArticle", async() => getOneArticle({id}));

  useEffect(() => {
    if(!queryProps.get("id") || error || status === "error") {
      redirect("/content/articles/");
    }
  }, [error, queryProps, redirect, status])

  return (
    <>
      <PageTitleBlock
        title="Редактировать статью"
        linkTitle="Назад"
        href="/content/articles"
      />
      {response ? (
        <ArticleForm
          data={{...response?.data, content: flattenContent(response?.data?.content)}}
        />
      ) : (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

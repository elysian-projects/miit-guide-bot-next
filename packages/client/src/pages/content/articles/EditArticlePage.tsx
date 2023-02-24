import { Alert, Box, CircularProgress } from "@mui/material";
import { ContentNode, FlatContent, flattenContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOneArticle, updateArticle } from "../../../api/articles";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { ArticleForm } from "./ArticleForm";
import { defaultFormState } from "./constants";

export const EditArticlePage: FC = () => {
  const [queryProps] = useSearchParams();
  const [id] = useState<string>(queryProps.get("id") ?? "");
  const {redirect} = useRedirect();
  const {response, error, status} = useHttp<ContentNode<FlatContent>>("editArticle", async () => getOneArticle({id}));
  const [formData, setFormData] = useState<ContentNode<FlatContent>>(response?.data || defaultFormState);
  const [submitResult, setSubmitResult] = useState<{ok: boolean, message: string} | null>(null);

  useEffect(() => {
    if(!queryProps.get("id") || error || status === "error") {
      redirect("/content/articles/");
    }
  }, [error, queryProps, redirect, status]);

  const onUpdate = (updatedContent: ContentNode<FlatContent>): void => {
    setFormData(updatedContent);
  };

  const onSubmit = async () => {
    setSubmitResult(await updateArticle(formData));
  };

  useEffect(() => {
    if(submitResult) {
      setTimeout(() => {
        closeSubmitAlert();
      }, 3000);
    }
  }, [submitResult]);

  const closeSubmitAlert = () => {
    setSubmitResult(null);
  };

  return (
    <>
      <PageTitleBlock
        title="Редактировать статью"
        linkTitle="Назад"
        href="/content/articles"
      />
      {response ? (
        <>
          {submitResult && (
            <Alert
              onClose={closeSubmitAlert}
              severity={submitResult.ok ? "success" : "error"}
            >
              {submitResult.message}
            </Alert>
          )}

          <ArticleForm
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            data={{...response?.data, content: flattenContent(response?.data?.content)}}
          />
        </>
      ) : (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

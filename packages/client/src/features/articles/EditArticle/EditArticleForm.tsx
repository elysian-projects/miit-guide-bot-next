import { ContentNode, FlatContent, flattenContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { ArticleForm } from "../../../widgets/ArticleForm/ArticleForm";
import { defaultFormState } from "../../../widgets/ArticleForm/constants";
import { getOneArticle, updateArticle } from "../api";
import { Loader } from "./components/Loader";
import { ResponseAlert } from "./components/ResponseAlert";

export const EditArticleForm: FC = () => {
  const {redirect} = useRedirect();
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));
  const {error, response, status} = useHttp<ContentNode<FlatContent>>("articles", async () => getOneArticle({id: id ?? ""}));
  const [formData, setFormData] = useState<ContentNode<FlatContent>>(response?.data || defaultFormState);
  const [submitResult, setSubmitResult] = useState<{ok: boolean, message: string} | null>(null);

  useEffect(() => {
    (!id || error || status === "error") && redirect("/content/articles");
  }, [error, redirect, status]);

  const onUpdate = (updatedContent: ContentNode<FlatContent>): void => {
    setFormData(updatedContent);
  };

  const onSubmit = async () => {
    setSubmitResult(await updateArticle(formData));
  };

  return (
    <>
      {response ? (
        <>
          <ResponseAlert submitResult={submitResult} />
          <ArticleForm
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            data={{...response?.data, content: flattenContent(response?.data?.content)}}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

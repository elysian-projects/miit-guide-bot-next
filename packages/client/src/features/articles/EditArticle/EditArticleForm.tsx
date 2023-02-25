import { ContentNode, FlatContent, flattenContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import { useOnLoad } from "../../../hooks/useOnLoad";
import { useRedirect } from "../../../hooks/useRedirect";
import { ArticleForm } from "../../../widgets/ArticleForm/ArticleForm";
import { defaultFormState } from "../../../widgets/ArticleForm/constants";
import { getOneArticle, updateArticle } from "../api";
import { Loader } from "./components/Loader";
import { ResponseAlert } from "./components/ResponseAlert";

export const EditArticleForm: FC = () => {
  const {redirect} = useRedirect();

  const onError = () => {
    redirect("/content/articles/");
  };

  const {id} = useOnLoad(["id"], onError);

  const {response, error, status} = useHttp<ContentNode<FlatContent>>("editArticle", async () => getOneArticle({id}));
  const [formData, setFormData] = useState<ContentNode<FlatContent>>(response?.data || defaultFormState);
  const [submitResult, setSubmitResult] = useState<{ok: boolean, message: string} | null>(null);

  useEffect(() => {
    (!id || error || status === "error") && onError();
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

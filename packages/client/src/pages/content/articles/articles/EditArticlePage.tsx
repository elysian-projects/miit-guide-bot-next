import { FC, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ContentNode } from "../../../../../../common/src";
import { getOneArticle } from "../../../../api/articles";
import { useHttp } from "../../../../hooks/useHttp";
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
      {response?.data?.label}
      <ArticleForm data={response?.data} />
    </>
  )
}

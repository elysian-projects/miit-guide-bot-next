import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { ContentNode } from "../../../../../common/src";
import { getOneArticle } from "../../../api/articles";
import { ArticleForm } from "./ArticleForm";

export const EditArticlePage: FC = () => {
  const [queryProps] = useSearchParams();
  const [id] = useState<string>(queryProps.get("id") ?? "");
  const [response] = useState<ContentNode | null>(null)
  const {data} = useQuery("articles", async() => getOneArticle({id}), {enabled: !response});

  if(!queryProps.get("id")) {
    return <Navigate replace to="/content/articles" />
  }

  return (
    <>
      {data?.label}
      <ArticleForm data={data} />
    </>
  )
}

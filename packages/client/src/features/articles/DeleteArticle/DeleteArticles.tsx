import { Alert } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { deleteArticle, getOneArticle } from "../api";
import { Dialog } from "./components/Dialog";
import { Loader } from "./components/Loader";

export const DeleteArticle: FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));
  const {error, isFetching, response, status} = useHttp<ContentNode<FlatContent>>("articles", async () => getOneArticle({id: id ?? ""}));
  const {redirect} = useRedirect();

  const closePage = () => {
    setOpen(false);
    redirect("/content/articles");
  };

  useEffect(() => {
    if(!id || error || status === "error") {
      closePage();
    }
  }, [closePage, error, id, status]);

  const handleDelete = async () => {
    await deleteArticle(id || "");
    closePage();
  };

  return <>
    {response?.data && (
      <Dialog
        open={open}
        articleLabel={response?.data.label}
        handleClose={closePage}
        handleDelete={handleDelete}
      />
    )}
    {isFetching ? (
      <Loader />
    ) : (response && !response.ok) && (
      <Alert severity={"error"}>
        {response.message}
      </Alert>
    )}
  </>;
};

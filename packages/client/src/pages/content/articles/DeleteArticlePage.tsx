import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useCallback, useEffect, useState } from "react";
import { deleteArticle, getOneArticle } from "../../../api/articles";
import { MainWrapper } from "../../../components/wrapper";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";

export const DeleteArticlePage: FC = () => {
  // Move modal window logic somewhere
  const [open, setOpen] = useState<boolean>(true);

  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));

  const {error, isFetching, response, status} = useHttp<ContentNode<FlatContent>>("articles", async () => getOneArticle({id: id ?? ""}));

  const {redirect} = useRedirect();

  const closePage = useCallback(() => {
    setOpen(false);
    redirect("/content/articles");
  }, [redirect]);

  useEffect(() => {
    if(!id || error || status === "error") {
      closePage();
    }
  }, [closePage, error, id, status]);

  const handleDelete = async () => {
    await deleteArticle(id || "");
    closePage();
  };

  return (
    <MainWrapper>
      {response?.data && (
        <Dialog
          open={open}
          keepMounted
          onClose={closePage}
          aria-describedby="alert-dialog-slide"
        >
          <DialogTitle>Подтвердите действие</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide">
              Вы уверены, что хотите удалить статью <b>"{response?.data.label}"</b>? После удаления восстановить статью будет невозможно!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="info" onClick={closePage}>Отмена</Button>
            <Button color="error" onClick={handleDelete}>Удалить</Button>
          </DialogActions>
        </Dialog>
      )}
      {isFetching ? (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress color="inherit" />
        </div>
      ) : (response && !response.ok) && (
        <Alert severity={"error"}>
          {response.message}
        </Alert>
      )}
    </MainWrapper>
  );
};

import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Navigate, redirect, useSearchParams } from "react-router-dom";
import { deleteArticle, getOneArticle } from '../../../api/articles';
import { MainWrapper } from '../../../components/wrapper';

export const DeleteArticlePage: FC = () => {
  const [queryProps] = useSearchParams();
  const [open, setOpen] = useState<boolean>(true);
  const [id] = useState<string>(queryProps.get("id") ?? "");
  const [response, setResponse] = useState<{ok: boolean, message: string} | null>(null)

  const query = useQuery("articles", async() => getOneArticle({id}), {enabled: !response});

  useEffect(() => {
    if(!id) {
      redirect("/content/articles");
    }
  }, [id, queryProps])

  const handleClose = () => {
    return <Navigate replace to={"/content/articles"} />
  }

  const handleDelete = async () => {
    setOpen(false);

    setResponse(await deleteArticle(id)
      ? {ok: true, message: "Статья успешно удалена!"}
      : {ok: false, message: "Произошла ошибка, данные не были изменены!"}
    );

    return <Navigate replace to={"/content/articles"} />
  }

  return (
    <MainWrapper>
      {response && (
        <Alert severity={response.ok ? "success" : "error"}>
          {response.message}
        </Alert>
      )}

      {(query.status === "success") ? (
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Подтвердите действие</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Вы уверены, что хотите удалить статью <b>"{query.data?.label}"</b>? После удаления восстановить статью будет невозможно!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="info" onClick={handleClose}>Отмена</Button>
            <Button color="error" onClick={handleDelete}>Удалить</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <>
          {!response && (
            <>
              <Alert severity="error">
                Произошла ошибка при загрузке данных!
              </Alert>
            </>
          )}
        </>
      )}
    </MainWrapper>
  )
}

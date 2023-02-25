import { Button, Dialog as MUIDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

interface IDialogProps {
  open: boolean,
  articleLabel: string,
  handleClose: () => void,
  handleDelete: () => void
}

export const Dialog: FC<IDialogProps> = ({
  open,
  articleLabel,
  handleClose,
  handleDelete,
}) => (
  <MUIDialog
    open={open}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide"
  >
    <DialogTitle>Подтвердите действие</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide">
        Вы уверены, что хотите удалить статью <b>"{articleLabel}"</b>?
        После удаления восстановить статью будет невозможно!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="info" onClick={handleClose}>Отмена</Button>
      <Button color="error" onClick={handleDelete}>Удалить</Button>
    </DialogActions>
  </MUIDialog>
);

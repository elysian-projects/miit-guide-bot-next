import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { FC, ReactNode } from "react";

interface IDialogProps {
  open: boolean,
  text: ReactNode,
  handleClose: () => void,
  handleDelete: () => void
}

export const DeleteDialog: FC<IDialogProps> = ({
  open,
  text,
  handleClose,
  handleDelete,
}) => (
  <Dialog
    open={open}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide"
  >
    <DialogTitle>Подтвердите действие</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="info" onClick={handleClose}>Отмена</Button>
      <Button color="error" onClick={handleDelete}>Удалить</Button>
    </DialogActions>
  </Dialog>
);

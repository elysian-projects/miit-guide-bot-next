import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

interface IConfirmEditDialogProps {
  open: boolean,
  returnDialogResult: (shouldEdit: boolean) => void
}

export const ConfirmEditDialog: FC<IConfirmEditDialogProps> = ({
  open,
  returnDialogResult
}) => {

  return (
    <Dialog
      open={open}
      onClose={() => returnDialogResult(false)}
    >
      <DialogTitle id="confirm-edit">
        Подтвердите действие
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-edit-description">
          Вы уверены, что хотите сохранить изменения? <b>Это действие невозможно отменить!</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => returnDialogResult(false)} autoFocus>Отмена</Button>
        <Button onClick={() => returnDialogResult(true)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

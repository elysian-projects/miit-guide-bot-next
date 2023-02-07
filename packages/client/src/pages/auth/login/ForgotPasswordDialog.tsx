import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { FC, useState } from "react";

export const ForgotPasswordDialog: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Grid container>
        <Grid item xs>
          <Button onClick={toggleOpen} variant="text" color="info">
            Забыли пароль?
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-forgot-password"
      >
        <DialogTitle>Внимание!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-forgot-password">
            В целях безопасности функция восстановления пароля отключена. Если Вы забыли пароль, обратитесь к администратору.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

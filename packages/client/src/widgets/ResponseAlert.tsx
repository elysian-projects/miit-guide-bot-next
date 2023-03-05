import { Alert } from "@mui/material";
import { IResponse } from "common/src";
import { FC, useEffect } from "react";

interface IResponseAlertProps {
  open: boolean,
  handleClose: () => void,
  submitResult: IResponse | null
}

export const ResponseAlert: FC<IResponseAlertProps> = ({open, handleClose, submitResult}) => {
  useEffect(() => {
    if(submitResult) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [submitResult]);

  return <>
    {open && (
      <Alert
        onClose={handleClose}
        severity={submitResult?.ok ? "success" : "error"}
      >
        {submitResult?.message}
      </Alert>
    )}
  </>;
};

import { Alert } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface IResponseAlertProps {
  submitResult: {message: string, ok: boolean} | null
}

export const ResponseAlert: FC<IResponseAlertProps> = ({submitResult}) => {
  const [open, setOpen] = useState<boolean>(Boolean(submitResult));

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(submitResult) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [submitResult]);

  return <>
    {open && submitResult && (
      <Alert
        onClose={handleClose}
        severity={submitResult.ok ? "success" : "error"}
      >
        {submitResult.message}
      </Alert>
    )}
  </>;
};

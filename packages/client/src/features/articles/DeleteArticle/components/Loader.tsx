import { CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loader: FC = () => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <CircularProgress color="inherit" />
  </div>
);

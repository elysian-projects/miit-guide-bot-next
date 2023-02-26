import { Box, CircularProgress } from "@mui/material";
import { CSSProperties, FC } from "react";

const boxStyles: CSSProperties = {
  display: "flex",
  width: "100%",
  justifyContent: "center"
};

export const Loader: FC = () => (
  <Box sx={boxStyles}>
    <CircularProgress />
  </Box>
);

import { Avatar, Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { CSSProperties, FC, FormEventHandler, ReactNode } from "react";

const aligningStyles = {
  display: "flex",
  flexDirection: "column",
} as CSSProperties;

interface IFormProps {
  children: ReactNode,
  buttonTitle: string
  title?: string,
  icon?: ReactNode,
  onSubmit?: FormEventHandler,
}

export const Form: FC<IFormProps> = ({
  children,
  buttonTitle,
  title,
  icon,
  onSubmit = () => 0
}) => {

  return (
    <Container component="div" sx={{maxWidth: "100%"}}>
      <CssBaseline />
      <Box sx={{...aligningStyles, alignItems: "center"}}>
        {icon && (
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {icon}
          </Avatar>
        )}
        {title && (
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        )}

        <Box
          sx={{...aligningStyles, marginTop: "10px", gap: "8px", width: "100%"}}
          component="form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {buttonTitle}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

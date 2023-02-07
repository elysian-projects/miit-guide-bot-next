import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";

export const LoginForm: FC = () => {
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">Вход</Typography>
          <Box component="form" noValidate={false} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <ForgotPasswordDialog />
          </Box>
        </Box>
      </Container>
  )
}

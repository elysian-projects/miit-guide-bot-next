import { LockOutlined } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { loginUser } from "../../../api/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useRedirect } from "../../../hooks/useRedirect";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";

type FormState = {
  login: string,
  password: string
}

const initialState: FormState = {
  login: "",
  password: "",
}

export const LoginForm: FC = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const {isAuthenticated, startSession} = useAuth();
  const {redirect} = useRedirect();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(isAuthenticated()) {
      redirect("/");
    }
  }, [isAuthenticated, redirect])

  const handleLogin: FormEventHandler = async (event) => {
    event.preventDefault();

    await loginUser(formState.login, formState.password)
    .then(response => {
      if((response.data as any).data?.token) {
        startSession((response.data as any).data?.token, formState.login);
        redirect("/", {refresh: true});
        return;
      }

      setError("Неизвестная ошибка!");
    })
    .catch(err => {
      setError(err.response.data.message);
    });
  }

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
          <Box component="form" onSubmit={handleLogin} noValidate={false} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
              value={formState.login}
              onChange={event => setFormState({...formState, login: event.target.value})}
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
              value={formState.password}
              onChange={event => setFormState({...formState, password: event.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            <ForgotPasswordDialog />
          </Box>
        </Box>
      </Container>
  )
}

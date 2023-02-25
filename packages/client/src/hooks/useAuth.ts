const SESSION_TOKEN_KEY = "token";
const SESSION_USER_LOGIN_KEY = "login";

export const useAuth = () => {
  const isAuthenticated = (): boolean => {
    return Boolean(sessionStorage.getItem(SESSION_TOKEN_KEY));
  };

  const getUserLogin = (): string | null => {
    if(!isAuthenticated()) {
      return null;
    }

    return sessionStorage.getItem(SESSION_USER_LOGIN_KEY);
  };

  const getUserToken = (): string | null => {
    if(!isAuthenticated()) {
      return null;
    }

    return sessionStorage.getItem(SESSION_TOKEN_KEY);
  };

  const startSession = (token: string, login: string): void => {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    sessionStorage.setItem(SESSION_USER_LOGIN_KEY, login);
  };

  const stopSession = (): boolean => {
    if(!isAuthenticated()) {
      return false;
    }

    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_USER_LOGIN_KEY);

    return true;
  };

  return {
    isAuthenticated,
    getUserLogin,
    getUserToken,
    startSession,
    stopSession
  };
};

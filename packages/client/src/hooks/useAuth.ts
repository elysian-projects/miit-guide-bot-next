const SESSION_TOKEN_KEY = "token";

export const useAuth = () => {
  const isAuthenticated = (): boolean => {
    return Boolean(sessionStorage.getItem(SESSION_TOKEN_KEY));
  }

  const startSession = (token: string): void => {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }

  const stopSession = (): boolean => {
    if(!isAuthenticated()) {
      return false;
    }

    sessionStorage.removeItem(SESSION_TOKEN_KEY);

    return true;
  }

  return {
    isAuthenticated,
    startSession,
    stopSession
  }
}

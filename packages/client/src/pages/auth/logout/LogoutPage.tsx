import { FC, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRedirect } from "../../../hooks/useRedirect";

export const LogoutPage: FC = () => {
  const {isAuthenticated, stopSession} = useAuth();
  const {redirect} = useRedirect();

  useEffect(() => {
    if(isAuthenticated()) {
      stopSession();
    }

    redirect("/", {refresh: true});
  }, [isAuthenticated, redirect, stopSession]);

  return (
    <div>Загрузка...</div>
  );
};

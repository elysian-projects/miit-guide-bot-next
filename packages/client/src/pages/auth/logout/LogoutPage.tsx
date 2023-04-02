import { FC, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";

export const LogoutPage: FC = () => {
  const {getQueryProp} = useSearchQuery();
  const redirectAfter = getQueryProp("redirect");
  const {isAuthenticated, stopSession} = useAuth();
  const {redirect} = useRedirect();

  useEffect(() => {
    if(isAuthenticated()) {
      stopSession();
    }

    redirect(redirectAfter || "/", {refresh: true});
  }, [isAuthenticated, redirect, stopSession]);

  return (
    <div>Загрузка...</div>
  );
};

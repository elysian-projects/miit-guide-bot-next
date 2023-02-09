import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "../pages/auth/login";
import { LogoutPage } from "../pages/auth/logout";

const baseUrl = "/auth";

export const authRoutes = (() => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      <Route path={baseUrl + "/login"} element={isAuthenticated() ? <Navigate to={"/"} /> : <LoginPage />} />
      <Route path={baseUrl + "/logout"} element={isAuthenticated() ? <LogoutPage /> : <Navigate to={"/"} />} />
    </>
  )
})();

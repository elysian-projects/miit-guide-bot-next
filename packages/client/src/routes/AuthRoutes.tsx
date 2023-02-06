import { Route } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";

const baseUrl = "/auth";

// TODO: this component must also check if the below routes are available for the user.
// Here we check if the user is logged in and if so redirect to the home page
export const authRoutes = (() => {
  return (
    <>
      <Route path={baseUrl + "/login"} element={<LoginPage />} />
    </>
  )
})();

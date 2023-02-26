import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AllTabsPage, DeleteTabPage, EditTabPage } from "../pages/content/tabs";
import { AddTabPage } from "../pages/content/tabs/";

const baseUrl = "/content/tabs";

export const tabsRoutes = (() => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      {!isAuthenticated() ? (
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      ) : (
        <>
          <Route path={baseUrl} element={<AllTabsPage />} />
          <Route path={baseUrl + "/add"} element={<AddTabPage />} />
          <Route path={baseUrl + "/edit"} element={<EditTabPage />} />
          <Route path={baseUrl + "/delete"} element={<DeleteTabPage />} />
        </>
      )}
    </>
  );
})();

import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AllTabsPage } from "../pages/content/tabs/AllTabsPage";

const tabsAllClient = new QueryClient();

const baseUrl = "/content/tabs";

export const tabsRoutes = (() => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      {!isAuthenticated() ? (
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      ) : (
        <Route path={baseUrl} element={
          <QueryClientProvider client={tabsAllClient}>
            <AllTabsPage />
          </QueryClientProvider>
        } />
      )}
    </>
  )
})();

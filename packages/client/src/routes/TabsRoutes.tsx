import { QueryClient, QueryClientProvider } from "react-query";
import { Route } from "react-router-dom";
import { AllTabsPage } from "../pages/content/tabs/AllTabsPage";

const tabsAllClient = new QueryClient();

const baseUrl = "/content/tabs";

export const tabsRoutes = (() => {
  return (
    <>
      <Route path={baseUrl} element={
        <QueryClientProvider client={tabsAllClient}>
          <AllTabsPage />
        </QueryClientProvider>
      } />
    </>
  )
})();

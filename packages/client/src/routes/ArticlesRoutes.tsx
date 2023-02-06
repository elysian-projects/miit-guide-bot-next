import { QueryClient, QueryClientProvider } from "react-query";
import { Route } from "react-router-dom";
import { AllArticlesPage } from "../pages/content/articles";
import { AddArticlePage } from "../pages/content/articles/articles/AddArticlePage";
import { DeleteArticlePage } from "../pages/content/articles/articles/DeleteArticlePage";
import { EditArticlePage } from "../pages/content/articles/articles/EditArticlePage";

const articlesGetClient = new QueryClient();
const articleGetClient = new QueryClient();
const articleEditClient = new QueryClient();
const articleDeleteClient = new QueryClient();

const baseUrl = "/content/articles";

// TODO: all of these routes can only be available for logged in users
export const articlesRoutes = (() => {
  return (
    <>
      <Route path={baseUrl} element={
        <QueryClientProvider client={articlesGetClient}>
          <AllArticlesPage />
        </QueryClientProvider>
      } />
      <Route path={baseUrl + "/add"} element={
        <QueryClientProvider client={articleGetClient}>
          <AddArticlePage />
        </QueryClientProvider>
      } />
      <Route path={baseUrl + "/edit"} element={
        <QueryClientProvider client={articleEditClient}>
          <EditArticlePage />
        </QueryClientProvider>
      } />
      <Route path={baseUrl + "/delete"} element={
        <QueryClientProvider client={articleDeleteClient}>
          <DeleteArticlePage />
        </QueryClientProvider>
      } />
    </>
  )
})();

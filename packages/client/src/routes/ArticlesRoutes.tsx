import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AddArticlePage, AllArticlesPage, DeleteArticlePage, EditArticlePage } from "../pages/content/articles";

const articlesGetClient = new QueryClient();
const articleGetClient = new QueryClient();
const articleEditClient = new QueryClient();
const articleDeleteClient = new QueryClient();

const baseUrl = "/content/articles";

export const articlesRoutes = (() => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      {!isAuthenticated() ? (
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      ) : (
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
      )}
    </>
  )
})();

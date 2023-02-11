import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AddArticlePage, AllArticlesPage, DeleteArticlePage, EditArticlePage } from "../pages/content/articles";

const baseUrl = "/content/articles";

export const articlesRoutes = (() => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      {!isAuthenticated() ? (
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      ) : (
        <>
          <Route path={baseUrl} element={<AllArticlesPage />} />
          <Route path={baseUrl + "/add"} element={<AddArticlePage />} />
          <Route path={baseUrl + "/edit"} element={<EditArticlePage />} />
          <Route path={baseUrl + "/delete"} element={<DeleteArticlePage />} />
        </>
      )}
    </>
  )
})();

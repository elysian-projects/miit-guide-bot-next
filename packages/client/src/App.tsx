import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Page } from "./components/page";
import { SidebarContextProvider } from "./contexts/sidebar";
import { NotFoundPage } from "./pages/404";
import { LoginPage } from "./pages/auth/login";
import { AllArticlesPage } from "./pages/content/articles";
import { AddArticlePage } from "./pages/content/articles/articles/AddArticlePage";
import { DeleteArticlePage } from "./pages/content/articles/articles/DeleteArticlePage";
import { EditArticlePage } from "./pages/content/articles/articles/EditArticlePage";
import { IndexPage } from "./pages/index";

const articlesGetClient = new QueryClient();
const articleGetClient = new QueryClient();
const articleEditClient = new QueryClient();
const articleDeleteClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <SidebarContextProvider>
        <Page>
          <Switch>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/content/articles" element={
              <QueryClientProvider client={articlesGetClient}>
                <AllArticlesPage />
              </QueryClientProvider>
            } />
            <Route path="/content/articles/add" element={
              <QueryClientProvider client={articleGetClient}>
                <AddArticlePage />
              </QueryClientProvider>
            } />
            <Route path="/content/articles/edit" element={
              <QueryClientProvider client={articleEditClient}>
                <EditArticlePage />
              </QueryClientProvider>
            } />
            <Route path="/content/articles/delete" element={
              <QueryClientProvider client={articleDeleteClient}>
                <DeleteArticlePage />
              </QueryClientProvider>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Switch>
        </Page>
      </SidebarContextProvider>
    </Router>
  );
}

export default App;

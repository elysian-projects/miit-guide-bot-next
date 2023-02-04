import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Page } from "./components/page";
import { SidebarContextProvider } from "./contexts/sidebar";
import { NotFoundPage } from "./pages/404";
import { LoginPage } from "./pages/auth/login";
import { ArticlePage } from "./pages/content/articles";
import { IndexPage } from "./pages/index";

const articleClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <SidebarContextProvider>
        <Page>
          <Switch>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/content/articles" element={
              <QueryClientProvider client={articleClient}>
                <ArticlePage />
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

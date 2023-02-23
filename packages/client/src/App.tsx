import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Page } from "./components/page";
import { defaultQueryOptions } from "./constants/query";
import { SidebarContextProvider } from "./contexts/sidebar";
import { NotFoundPage } from "./pages/404";
import { IndexPage } from "./pages/index";
import { articlesRoutes } from "./routes/ArticlesRoutes";
import { authRoutes } from "./routes/AuthRoutes";
import { tabsRoutes } from "./routes/TabsRoutes";

const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions
});

const App = () => {
  return (
    <Router>
      <SidebarContextProvider>
        <QueryClientProvider client={queryClient}>
          <Page>
            <Switch>
              <Route path="/" element={<IndexPage />} />
              {authRoutes}
              {articlesRoutes}
              {tabsRoutes}
              <Route path="*" element={<NotFoundPage />} />
            </Switch>
          </Page>
        </QueryClientProvider>
      </SidebarContextProvider>
    </Router>
  );
};

export default App;

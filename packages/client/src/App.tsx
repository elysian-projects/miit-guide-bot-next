import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Page } from "./components/page";
import { SidebarContextProvider } from "./contexts/sidebar";
import { NotFoundPage } from "./pages/404";
import { IndexPage } from "./pages/index";
import { articlesRoutes } from "./routes/ArticlesRoutes";
import { authRoutes } from "./routes/AuthRoutes";

const App = () => {
  return (
    <Router>
      <SidebarContextProvider>
        <Page>
          <Switch>
            <Route path="/" element={<IndexPage />} />
            {authRoutes}
            {articlesRoutes}
            <Route path="*" element={<NotFoundPage />} />
          </Switch>
        </Page>
      </SidebarContextProvider>
    </Router>
  );
}

export default App;

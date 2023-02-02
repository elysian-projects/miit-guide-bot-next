import { QueryClient, QueryClientProvider } from "react-query";
import { Page } from "./components/page";
import { ArticlePage } from "./pages/article";

const articleClient = new QueryClient();

const App = () => {
  return (
    <Page>
      <QueryClientProvider client={articleClient}>
        <ArticlePage />
      </QueryClientProvider>
    </Page>
  );
}

export default App;

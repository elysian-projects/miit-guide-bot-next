import { Page } from "./components/page";
import { Sidebar } from "./components/sidebar";
import { Unauth } from "./components/unauth";

function App() {
  return (
    <Page>
      <Sidebar />
      <Unauth />
    </Page>
  );
}

export default App;

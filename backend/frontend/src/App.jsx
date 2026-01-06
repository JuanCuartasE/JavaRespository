import Sidebar from "./components/Sidebar";
import TopicsPage from "./pages/TopicsPage";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <TopicsPage />
      </main>
    </div>
  );
}

export default App;

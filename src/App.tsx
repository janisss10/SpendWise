import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Dashboard /> : <Login />;
}

export default App;

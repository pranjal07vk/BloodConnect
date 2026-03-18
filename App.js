import { useState } from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Welcome from "./Welcome/Welcome";

// ✅ Centralized page constants (prevents bugs)
const PAGES = {
  LOGIN: "login",
  WELCOME: "welcome",
  DASHBOARD: "dashboard",
};

function App() {
  const [user, setUser] = useState("");
  const [page, setPage] = useState(PAGES.LOGIN);

  return (
    <>
      {/* LOGIN PAGE */}
      {page === PAGES.LOGIN && (
        <Login
          onLogin={(username) => {
            setUser(username);
            setPage(PAGES.WELCOME);
          }}
        />
      )}

      {/* WELCOME PAGE (only if user exists) */}
      {page === PAGES.WELCOME && user && (
        <Welcome
          username={user}
          onNext={() => setPage(PAGES.DASHBOARD)}
        />
      )}

      {/* DASHBOARD PAGE (only if user exists) */}
      {page === PAGES.DASHBOARD && user && (
        <Dashboard username={user} />
      )}
    </>
  );
}

export default App;
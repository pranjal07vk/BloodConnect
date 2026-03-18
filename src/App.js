import { useState } from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Welcome from "./Welcome/Welcome";

function App() {
  const [user, setUser] = useState("");
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={(username) => {
            setUser(username);
            setPage("welcome");
          }}
        />
      )}

      {page === "welcome" && (
        <Welcome
          username={user}
          onNext={() => setPage("dashboard")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard username={user} />
      )}
    </>
  );
}

export default App;
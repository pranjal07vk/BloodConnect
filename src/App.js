import { useState } from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Welcome from "./Welcome/Welcome";

function App() {
  const [user, setUser] = useState("");
  const [page, setPage] = useState("Login");

  return (
    <>
      {page === "Login" && (
        <Login
          onLogin={(username) => {
            setUser(username);
            setPage("Welcome");
          }}
        />
      )}

      {page === "Welcome" && (
        <Welcome
          username={user}
          onNext={() => setPage("Dashboard")}
        />
      )}

      {page === "Dashboard" && (
        <Dashboard 
          username={user} 
          onLogout={() => {
            setUser("");
            setPage("Login");
          }} 
        />
      )}
    </>
  );
}

export default App;
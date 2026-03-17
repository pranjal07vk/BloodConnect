import { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login-page">

      <div className={`container ${isSignUp ? "active" : ""}`}>

        {/* SIGN IN */}
        <div className="form sign-in">
          <h2>Sign In</h2>

          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <button>Login</button>
        </div>

        {/* SIGN UP */}
        <div className="form sign-up">
          <h2>Sign Up</h2>

          <input type="text" placeholder="Name" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Blood Group" />

          <button>Continue</button>
        </div>

        {/* TOGGLE PANEL */}
        <div className="toggle-box">
          <button onClick={() => setIsSignUp(false)}>Sign In</button>
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
        </div>

      </div>

    </div>
  );
}

export default Login;
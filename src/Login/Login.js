import { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-container">

        {/* SIGN IN */}
        <div className={`form sign-in ${isSignUp ? "inactive" : "active"}`}>
          <h2>Sign In</h2>

          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <button>Login</button>

          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsSignUp(true)} className="link">
              Sign Up
            </span>
          </p>
        </div>

        {/* SIGN UP */}
        <div className={`form sign-up ${isSignUp ? "active" : "inactive"}`}>
          <h2>Sign Up</h2>

          <input type="text" placeholder="Name" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Blood Group" />

          <button>Continue</button>

          <p>
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)} className="link">
              Sign In
            </span>
          </p>
        </div>

    </div>
  );
}

export default Login;
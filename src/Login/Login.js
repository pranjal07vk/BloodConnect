import { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="auth-container">

        {/* SIGN IN */}
        <div 
          className={`form sign-in ${isSignUp ? "inactive" : "active"}`}
          style={{ pointerEvents: isSignUp ? "none" : "auto", opacity: isSignUp ? 0.6 : 1 }}
        >
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
        <div 
          className={`form sign-up ${isSignUp ? "active" : "inactive"}`}
          style={{ pointerEvents: isSignUp ? "auto" : "none", opacity: isSignUp ? 1 : 0.6 }}
        >
          <h2>Sign Up</h2>

          {step === 1 && (
            <>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Blood Group" />

              <button onClick={() => setStep(2)}>Continue</button>
            </>
          )}

          {step === 2 && (
            <>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />

              <button>Submit</button>
            </>
          )}

          <p>
            Already have an account?{" "}
            <span onClick={() => {
              setIsSignUp(false);
              setStep(1); // reset
            }} className="link">
              Sign In
            </span>
          </p>
        </div>

    </div>
  );
}

export default Login;
import { useState } from "react";
import "./Login.css";

function Login( onLogin ) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    city: "",
    bloodGroup: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSignInChange = (e) => {
    const { name, value } = e.target;

    setSignInData({
      ...signInData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateSignIn = () => {
    let newErrors = {};

    if (!signInData.username) newErrors.username = "Username required";
    if (!signInData.password) newErrors.password = "Password required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    let newErrors = {};

    if (!signUpData.name) newErrors.name = "Name required";
    if (!signUpData.city) newErrors.city = "City required";
    if (!signUpData.bloodGroup) newErrors.bloodGroup = "Blood group required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};

    if (!signUpData.username) newErrors.username = "Username required";
    if (!signUpData.password) newErrors.password = "Password required";

    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [successMsg, setSuccessMsg] = useState("");

  return (
    <div className="auth-container">

        {/* SIGN IN */}
        <div 
          className={`form sign-in ${isSignUp ? "inactive" : "active"}`}
          style={{ pointerEvents: isSignUp ? "none" : "auto", opacity: isSignUp ? 0.6 : 1 }}
        >

          {successMsg && <p className="success">{successMsg}</p>}
          
          <h2>Sign In</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signInData.username}
            onChange={handleSignInChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleSignInChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button onClick={() => {
            if (validateSignIn()) {
              onLogin(signInData.username);
            }
          }}>
            Login
          </button>

          <p>
            Don't have an account?{" "}
            <span
              className="link"
              onClick={() => {
                setIsSignUp(true);

                setSignInData({
                  username: "",
                  password: "",
                });

                setErrors({});
              }}>
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
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signUpData.name}
                onChange={handleSignUpChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <input
                type="text"
                name="city"
                placeholder="City"
                value={signUpData.city}
                onChange={handleSignUpChange}
              />
              {errors.city && <p className="error">{errors.city}</p>}

              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                maxLength={3}
                value={signUpData.bloodGroup}
                onChange={handleSignUpChange}
              />
              {errors.bloodGroup && <p className="error">{errors.bloodGroup}</p>}

              <button onClick={() => {
                if (validateStep1()) {
                  setStep(2);
                }
              }}>
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signUpData.username}
                onChange={handleSignUpChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={handleSignUpChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

              <button onClick={() => {
                if (validateStep2()) {
                  setSuccessMsg("Signup successful! Please login.");

                  setSignUpData({
                    name: "",
                    city: "",
                    bloodGroup: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                  });

                  setStep(1);
                  setIsSignUp(false);
                }
              }}>
                Submit
              </button>
            </>
          )}

          <p>
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => {
                setIsSignUp(false);
                setStep(1);

                  setSignUpData({
                    name: "",
                    city: "",
                    bloodGroup: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                  });

                  setErrors({});
                }}>
              Sign In
            </span>
          </p>
        </div>

    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  // State variables
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Handle form submission
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const { displayName, email } = res?.user;
        setSubmitButtonDisabled(false);
        navigate("/task", {
          state: { name: displayName, email: email },
        });
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="min-w-min bg-gradient-to-r from-red-400 to-red-200 shadow-md p-6 rounded-lg flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Email input field */}
        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />

        {/* Password input field */}
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          type="password"
          placeholder="Enter Password"
        />

        <div className="space-y-4">
          {/* Display error message, if any */}
          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          {/* Submit button */}
          <button
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
            className={`${
              submitButtonDisabled ? "bg-gray-400" : "bg-purple-900"
            } text-white rounded-md font-bold text-lg py-2 w-full`}
          >
            {submitButtonDisabled ? "Logging in..." : "Login"}
          </button>

          {/* Link to signup page */}
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/signup" className="font-bold text-purple-900">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

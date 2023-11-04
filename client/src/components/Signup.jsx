import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  // State variables
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Handle form submission
  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="min-w-min bg-gradient-to-r from-red-400 to-red-200 shadow-md p-6 rounded-lg flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Signup</h1>

        {/* Name input field */}
        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />

        {/* Email input field */}
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        {/* Password input field */}
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="space-y-4">
          {/* Display error message, if any */}
          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          {/* Submit button */}
          <button
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
            className={`${
              submitButtonDisabled ? "bg-gray-400" : "bg-purple-900"
            } text-white rounded-md font-bold text-lg py-2 w-full`}
          >
            {submitButtonDisabled ? "Signing up..." : "Signup"}
          </button>

          {/* Link to login page */}
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/" className="font-bold text-purple-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

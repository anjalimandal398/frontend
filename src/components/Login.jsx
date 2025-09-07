import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { emailId, password }
        : { firstName, lastName, emailId, password };

      const res = await axios.post(BASE_URL + url, payload, {
        withCredentials: true,
      });

      // ✅ Automatically log in user after signup
      dispatch(addUser(res.data.data)); // store user in Redux
      navigate("/"); // redirect to home page
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleAuth}>
            {!isLogin && (
              <>
                {/* First Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your first name"
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Enter your last name"
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={emailId}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            <p className="text-red-500">{error}</p>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Toggle Link */}
          <p className="text-sm text-center mt-4">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(""); // clear error when toggling
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

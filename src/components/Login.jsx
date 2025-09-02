import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const Dispatch = useDispatch();


  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
       BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      Dispatch(addUser(res.data));
      return navigate("/")

    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

            {/* Actions */}
            <p className="text-red-500">{error}</p>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>

          {/* Extra links */}
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

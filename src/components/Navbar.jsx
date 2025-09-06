import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Scroll listener for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`navbar fixed top-0 z-50 items-center p-4 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-sky-500 via-pink-500 to-purple-600 shadow-lg"
          : "bg-gradient-to-r from-sky-400 via-pink-400 to-purple-500 shadow-md"
      }`}
    >
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold text-white hover:scale-105 hover:text-yellow-200 transition-transform duration-300"
        >
          👨‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-4 items-center">
          <div className="text-white font-medium">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition duration-300"
            >
              <div className="w-10 rounded-full ring-2 ring-transparent hover:ring-yellow-300 transition duration-300">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-xl mt-3 w-52 p-2 shadow-md animate-fade-in"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between hover:bg-pink-50 transition duration-200"
                >
                  Profile
                  <span className="badge bg-sky-500 text-white">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-pink-50 transition duration-200"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-pink-50 transition duration-200"
                >
                  Request
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hover:bg-red-50 transition duration-200"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

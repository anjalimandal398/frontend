import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
          alt="empty"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h1 className="text-2xl font-semibold">No Connections Found</h1>
        <p className="text-sm">Start connecting with people to see them here.</p>
      </div>
    );

  return (
    <div className="text-center my-10 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-8">
        Your Connections
      </h1>

      {/* Connections List */}
      <div className="flex flex-col items-center gap-6">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={index}
              className="flex items-center gap-6 w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl shadow-lg bg-white dark:bg-base-300 hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
            >
              {/* Profile Image */}
              <img
                className="w-20 h-20 object-cover rounded-full border-3 border-pink-400"
                src={photoUrl}
                alt="profile"
              />

              {/* Details */}
              <div className="text-left flex-1">
                <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-500 text-sm">
                    {age} yrs • {gender}
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300 mt-1">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

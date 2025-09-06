import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests); // ✅ store key matches

  // Fetch requests from API
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data || [])); // fallback empty array
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Loading / null check
  if (!requests) return null;

  // Empty state
  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
          alt="empty"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h1 className="text-2xl font-semibold">No Requests Found</h1>
        <p className="text-sm">Start connecting with people to see them here.</p>
      </div>
    );

  // Requests list
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-8">
        Your Connection Requests
      </h1>

      <div className="flex flex-col items-center gap-6">
        {requests.map((req) => {
          const user = req.fromUserId;
          if (!user) return null; // skip null entries

          const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

          return (
            <div
              key={_id}
              className="flex items-center gap-6 w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl shadow-lg bg-white dark:bg-base-300 hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
            >
              {/* Profile Image */}
              <img
                className="w-20 h-20 object-cover rounded-full border-4 border-pink-400"
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
              <div>
              <button className="btn btn-primary mx-2">Accept</button>
              <button className="btn btn-secondary ">Reject</button>
              </div>
              
            </div>
            
          );
        })}
        
      </div>
    </div>
  );
};


export default Requests;

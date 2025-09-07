import React, { useRef } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constant";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const sendRequest = async (status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + user._id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error sending request:", err);
    } finally {
      dispatch(removeUserFromFeed(user._id));
    }
  };

  const onSwipe = (direction) => {
    if (direction === "right") sendRequest("interested");
    if (direction === "left") sendRequest("ignored");
  };


  const swipe = async (dir) => {
    await cardRef.current.swipe(dir); 
  };

  return (
    <TinderCard
      ref={cardRef}
      className="absolute w-[300px] max-w-sm"
      onSwipe={onSwipe}
      preventSwipe={["up", "down"]}
    >
      <div className="bg-base-300 mt-[20px] shadow-xl rounded-xl overflow-hidden">
        <img
          src={user.photoUrl}
          alt="user"
          className="w-full h-72 object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-lg">
            {user.firstName} {user.lastName}
          </h2>
          {user.age && user.gender && (
            <p className="text-sm text-gray-600">
              {user.age}, {user.gender}
            </p>
          )}
          <p className="text-sm">{user.about}</p>

          {/* ✅ buttons with primary/secondary */}
          <div className="flex justify-around mt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => swipe("left")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => swipe("right")}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </TinderCard>
  );
};

export default UserCard;

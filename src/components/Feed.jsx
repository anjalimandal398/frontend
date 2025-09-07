import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
          alt="no users"
          className="w-32 h-32 mb-4 opacity-70 animate-pulse"
        />
        <h1 className="text-3xl font-extrabold text-gray-700 mb-2">
          No New Users Around!
        </h1>
        <p className="text-sm text-gray-500 text-center px-4">
          Looks like everyone has been discovered. Check back later or update
          your profile to get better matches!
        </p>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-[70vh]">
      {/* ek ek karke swipe hoga */}
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;

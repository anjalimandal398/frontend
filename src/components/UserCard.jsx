import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constant";

const UserCard = ({ user }) => {
  if (!user) return null;
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
        
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-70 h-[420px] shadow-xl">
      {" "}
      <figure>
        <img
          src={photoUrl}
          alt="user photo"
          className="w-full h-70 object-cover object-center rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm">{about}</p>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

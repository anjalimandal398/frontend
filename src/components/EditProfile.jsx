import React, { useState } from "react";
import UserCard from "./userCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    setError("");

    e.preventDefault(); // form reload na ho
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start mb-10 mt-10 gap-6 ">
        {/* Edit Form */}
        <div className="card bg-base-300 w-[350px] shadow-sm mb-[20px] mt-[-10px]">
          <div className="card-body p-4">
            <h2 className="card-title text-center justify-center text-base">
              Edit Profile
            </h2>

            <form className="flex flex-col gap-2" onSubmit={saveProfile}>
              {/* First Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered input-xs h-7.5 w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered input-xs h-7.5 w-full"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered input-xs h-7.5 w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
              </div>

              {/* Age */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered input-xs h-7.5 w-full"
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              {/* Gender */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">Gender</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered select-xs h-7.5 w-full text-sm"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">male</option>
                  <option value="Female">female</option>
                  <option value="Other">other</option>
                </select>
              </div>

              {/* About */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-sm">About</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered textarea-xs w-full text-sm"
                  rows={3}
                  required
                />
              </div>

              {/* Actions */}
              <div className="form-control mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-xs h-7.5 w-full text-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {/* UserCard */}
        <div className="w-72">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg">
            <span>✅ Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

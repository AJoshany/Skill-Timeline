import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  setProfile,
  getProfile,
  getProfileById,
  updateProfile,
} from "../../services/profileService";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../supabase";

export default function EditProfile() {
  //   const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState("");
  const [full_name, setFull_name] = useState("");
  const [bio, setBio] = useState("");
  const [is_public, setIs_public] = useState();
  const [isUpdating, setIsupdating] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProfileData = async () => {
    const user_id = user.id;
    const data = await getProfileById(user_id);
    return data;
  };

  useEffect(() => {
    const setProfileFields = async () => {
      const profileData = await getProfileData();
      console.log(profileData);
      setUsername(profileData[0].username);
      setFull_name(profileData[0].full_name);
      setBio(profileData[0].bio);
      setIs_public(profileData[0].is_public);
    };
    setProfileFields();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfile(user.id, {
        username: username,
        full_name: full_name,
        bio: bio,
        is_public: is_public,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        setError("This UserName is Already Taken");
      } else {
        setError(null);
        console.log("Error adding skill:", err.message);
      }
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full max-w-md gap-3 p-4 text-white bg-gray-800 rounded-lg "
    >
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          type="text"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.full_name && <p>{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block mb-1">UserName</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.username && <p>{errors.username.message}</p>}
        {error && <p className="text-xs text-red-700 mt-2">{error}</p>}
      </div>

      <div>
        <label className="block mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>

      <div className="flex items-center gap-5">
        <label>Public or Not?</label>
        <input type="checkbox" onChange={(e) => setIs_public(e.target.value)} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        {isSubmitting ? "Saving..." : "Create Profile"}
      </button>
    </form>
  );
}

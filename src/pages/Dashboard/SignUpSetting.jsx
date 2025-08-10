import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setProfile, getProfile } from "../../services/profileService";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../supabase";

export default function Setting() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const checkProfile = async () => {
    const user_id = user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id);

    const profile = await getProfile(data[0].username);

    if (!profile) {
      navigate("/dashboard");
    }
  };
  checkProfile();

  const submitHandler = async (formData) => {
    try {
      await setProfile({
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
        is_public: formData.is_public,
      });

      navigate("/dashboard");
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
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col w-full max-w-md gap-3 p-4 text-white bg-gray-800 rounded-lg "
    >
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          {...register("full_name", { required: "Full name is required" })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.full_name && <p>{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block mb-1">UserName</label>
        <input
          type="text"
          {...register("username", { required: "UserName is required" })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.username && <p>{errors.username.message}</p>}
        {error && <p className="text-xs text-red-700 mt-2">{error}</p>}
      </div>

      <div>
        <label className="block mb-1">Bio</label>
        <textarea
          {...register("bio")}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>

      <div className="flex items-center gap-5">
        <label>Public or Not?</label>
        <input type="checkbox" {...register("is_public")} />
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

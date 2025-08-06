import React from "react";
import { useForm } from "react-hook-form";
import { addSkill, getSkills } from "../../services/skillsService";

export default function AddSkillForm({ onSkillAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (formData) => {
    try {
      await addSkill({
        title: formData.title,
        level: Number(formData.level),
        description: formData.description,
        start_date: formData.start_date,
      });

      const updatedSkills = await getSkills();
      onSkillAdded(updatedSkills);

      reset();
    } catch (err) {
      console.log("Error adding skill:", err.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col max-w-md gap-3 p-4 text-white bg-gray-800 rounded-lg"
    >
      <div>
        <label className="block mb-1">Skill Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Skill Level(%)</label>
        <input
          type="number"
          min="0"
          max="100"
          {...register("level", {
            required: "Level is required",
            min: { value: 0, message: "Min value is 0" },
            max: { value: 100, message: "Max value is 100" },
          })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
        {errors.level && <p>{errors.level.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Start Date</label>
        <input
          type="date"
          {...register("start_date")}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        {isSubmitting ? "Saving..." : "Add Skill"}
      </button>
    </form>
  );
}

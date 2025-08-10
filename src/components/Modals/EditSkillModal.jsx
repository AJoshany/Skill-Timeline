import React, { useState } from "react";
import { updateSkill } from "../../services/skillsService";

export default function EditSkillModal({ skill, onClose, OnSkillUpdated }) {
  const [title, setTitle] = useState(skill.title);
  const [level, setLevel] = useState(skill.level);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSkill(skill.id, { title, level });
      OnSkillUpdated();
      onClose();
    } catch (err) {
      console.log("Error in Edit Skill:", err.message);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[var(--color-secondary-dark)] p-6 rounded shadow-md w-80">
        <h2 className="mb-4 text-lg font-semibold">Edit Skill</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            placeholder="Skill Name"
          />
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full p-2 mb-3 border rounded"
            placeholder="Percent"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 text-black bg-gray-300 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

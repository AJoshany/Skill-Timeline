import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillsService";
export default function Dashboard() {
  const { logout, user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getSkills();
        console.log("Skills Data:", data);
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const handleAdd = async () => {
    try {
      await addSkill({
        title: "React Js",
        level: 50,
        start_date: "2024-01-05",
        description: "Fron-end Library",
      });
      const updated = await getSkills();
      setSkills(updated);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      const updated = await getSkills();
      setSkills(updated);
    } catch (err) {
      console.log(err.message);
    }
  };
  if (loading) return <p>Lodaing...</p>;
  return (
    <>
      <div>Dashboard</div>
      <div>hello {user.email}</div>
      <div>
        <h1 className="mb-4 text-xl font-bold">Your Skills</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add A sample Skill
        </button>

        <ul className="mt-4">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <span>
                {skill.title} - {skill.level}
              </span>
              <button
                onClick={() => handleDelete(skill.id)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={logout}>logout</button>
    </>
  );
}

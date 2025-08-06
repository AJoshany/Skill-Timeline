import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getSkills, deleteSkill } from "../../services/skillsService";
import AddSkillForm from "../../components/Forms/AddSkillForm";
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

  // const handleAdd = async () => {
  //   try {
  //     await addSkill({
  //       title: "React Js",
  //       level: 50,
  //       start_date: "2024-01-05",
  //       description: "Fron-end Library",
  //     });
  //     const updated = await getSkills();
  //     setSkills(updated);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleSkillAdded = (updatedSkills) => {
    setSkills(updatedSkills);
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

      <div className="p-4 text-white">
        <h1 className="mb-4 text-2xl font-bold">Your Skills</h1>

        <AddSkillForm onSkillAdded={handleSkillAdded} />

        <ul className="mt-6">
          {skills.map((skill) => (
            <li key={skill.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.title}</span>
                <span className="text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <button
                onClick={() => handleDelete(skill.id)}
                className="mt-2 text-sm text-red-400 hover:underline"
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

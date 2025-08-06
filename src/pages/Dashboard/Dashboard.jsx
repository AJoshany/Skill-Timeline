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

      <div className="w-full text-white">
        <div className="grid grid-cols-1 px-5 md:grid-cols-2 md:px-0">
          <div className="flex flex-col items-start">
            <h2 className="py-3 mb-4 ml-2 text-2xl font-bold border-b-4 pr-7 border-b-[var(--color-primary)]">Add Skill</h2>
            <AddSkillForm onSkillAdded={handleSkillAdded} />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="py-3 mb-4   text-2xl font-bold border-b-4 pr-7 border-b-[var(--color-primary)]">Your Skills</h2>
            <ul className="flex flex-col w-full mt-6 grow">
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
        </div>
      </div>

      <button onClick={logout}>logout</button>
    </>
  );
}

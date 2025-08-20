import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { getSkills } from "../../services/skillsService";
import { getProfile } from "../../services/profileService";

export default function PublicProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [profileData, skillsData] = await Promise.all([
          getProfile(username),
          getSkills(),
        ]);

        setUserData(Array.isArray(profileData) ? profileData : []);
        setUserSkills(Array.isArray(skillsData) ? skillsData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User Not Found!</p>;

  return (
    <div className="flex flex-col justify-between w-full md:flex-row">
      <div>
        <h1 className="mb-4 text-3xl font-bold">{userData[0].full_name}</h1>
        <p className="mb-6 text-gray-500">@{username}</p>
        <p className="mb-6 text-gray-500">{userData[0].bio}</p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {userSkills.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center gap-3 p-4 border-2  rounded-xl shadow-[5px_5px_17px_-2px_rgba(0,_0,_0,_0.8)]">
            <h2 className="text-xl font-semibold">{skill.title}</h2>
            <div className="mt-2 bg-gray-200 rounded-full border-5 w-50 h-50 shadow-[inset_0px_4px_9px_1px_rgba(0,_0,_0,_0.35)] relative">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                  #4caf50 0% ${skill.level}%,
                  transparent ${skill.level}% 100%
                )` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-400">{skill.level}%</p>
            <p className="mt-1 text-sm text-gray-300">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabase";
import { getSkills } from "../../services/skillsService";
import { getProfile } from "../../services/profileService";

export default function PublicProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState(null)


  useEffect(() => {
    const fetchProfile = async () => {
      let data = await getProfile(username)
      setUserData(Array.isArray(data) ? data : [])
    }

    const fetchSkills = async () => {
      let data = await getSkills()
      setUserSkills(Array.isArray(data) ? data : [])
    }

    fetchProfile()
    fetchSkills()
    setLoading(false)

  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User Not Found!</p>;

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{userData[0].full_name}</h1>
      <p className="mb-6 text-gray-500">@{username}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {userSkills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{skill.title}</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-400">{skill.level}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

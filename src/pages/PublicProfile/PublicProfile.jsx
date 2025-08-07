import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/users/${username}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!userData) return <p>کاربر پیدا نشد.</p>;

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{userData.fullName}</h1>
      <p className="mb-6 text-gray-500">@{username}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {userData.skills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{skill.name}</h2>
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

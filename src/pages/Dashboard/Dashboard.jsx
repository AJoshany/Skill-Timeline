import React from "react";
import { useAuth } from "../../hooks/useAuth";
export default function Dashboard() {
  const { logout, user } = useAuth();
  return (
    <>
      <div>Dashboard</div>
      <div>hello {user.email}</div>
      <button onClick={logout}>logout</button>
    </>
  );
}

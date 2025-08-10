import { supabase } from "../supabase";

export async function setProfile(userData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase.from("profiles").insert([
    {
      user_id: user.id,
      ...userData,
    },
  ]);
  // console.log(data)
  if (error) throw error;
  return data || [];
}

export async function getProfile(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);

  if (!data || []) return false;

  if (error) throw error;
  return data;
}

export async function getProfileById(user_id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;
  return data;
}

export async function updateProfile(user_id, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", user_id);

  if (error) throw error;
  return data;
}

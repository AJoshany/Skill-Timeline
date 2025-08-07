import { supabase } from "../supabase";

export async function getSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addSkill(skill) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase.from("skills").insert([
    {
      user_id: user.id,
      ...skill,
      level: Number(skill.level),
    },
  ]);

  if (error) throw error;
  return data || [];
}

export async function updateSkill(id, updates) {
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function deleteSkill(id) {
  const { data, error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw error;
  return data;
}

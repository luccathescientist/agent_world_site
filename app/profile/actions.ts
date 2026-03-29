"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const githubUrl = (formData.get("github_url") as string | null)?.trim() || null;

  // Upsert so it works for both new and existing profiles
  await supabase.from("profiles").upsert({
    id: user.id,
    github_url: githubUrl,
    updated_at: new Date().toISOString(),
  });

  redirect("/profile?saved=1");
}

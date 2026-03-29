"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function signInWithProvider(provider: "google" | "github") {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "https://agent-world.dev";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error || !data.url) redirect("/login?error=auth");
  redirect(data.url);
}

export async function signInWithGoogle() {
  await signInWithProvider("google");
}

export async function signInWithGitHub() {
  await signInWithProvider("github");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

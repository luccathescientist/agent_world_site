"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createWorld(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const screenshotFile = formData.get("screenshot") as File | null;
  const gameStateFile = formData.get("game_state") as File | null;

  if (!title?.trim()) {
    redirect("/worlds/new?error=title_required");
  }

  // Upload screenshot to storage
  let screenshotUrl: string | null = null;
  if (screenshotFile && screenshotFile.size > 0) {
    const ext = screenshotFile.name.split(".").pop() ?? "png";
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("world-screenshots")
      .upload(path, screenshotFile, { contentType: screenshotFile.type });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from("world-screenshots")
        .getPublicUrl(path);
      screenshotUrl = urlData.publicUrl;
    }
  }

  // Parse game_state JSON
  let gameState: Record<string, unknown> | null = null;
  if (gameStateFile && gameStateFile.size > 0) {
    try {
      const text = await gameStateFile.text();
      gameState = JSON.parse(text);
    } catch {
      redirect("/worlds/new?error=invalid_json");
    }
  }

  const { data, error } = await supabase
    .from("worlds")
    .insert({
      user_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      screenshot_url: screenshotUrl,
      game_state: gameState,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/worlds/new?error=save_failed");
  }

  redirect(`/worlds/${data.id}`);
}

export async function deleteWorld(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("worlds").delete().eq("id", id).eq("user_id", user.id);
  redirect("/worlds");
}

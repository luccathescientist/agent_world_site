"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createWorld(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const screenshotFile = formData.get("screenshot") as File | null;

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

  const { data, error } = await supabase
    .from("worlds")
    .insert({
      user_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      screenshot_url: screenshotUrl,
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

export async function addWorldComment(worldId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const body = (formData.get("body") as string)?.trim();
  if (!body) return;

  await supabase.from("world_comments").insert({
    world_id: worldId,
    user_id: user.id,
    body,
  });
  revalidatePath(`/worlds/${worldId}`);
}

export async function editWorldComment(commentId: string, worldId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const body = (formData.get("body") as string)?.trim();
  if (!body) return;

  await supabase.from("world_comments").update({ body }).eq("id", commentId).eq("user_id", user.id);
  revalidatePath(`/worlds/${worldId}`);
}

export async function deleteWorldComment(commentId: string, worldId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("world_comments").delete().eq("id", commentId).eq("user_id", user.id);
  revalidatePath(`/worlds/${worldId}`);
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCategory, type CategorySlug } from "@/lib/forum";

export async function createThread(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const category = formData.get("category") as CategorySlug;
  const title = (formData.get("title") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();

  if (!getCategory(category) || !title || !body) return;

  const { data, error } = await supabase
    .from("threads")
    .insert({ user_id: user.id, category, title, body })
    .select("id")
    .single();

  if (error || !data) return;

  redirect(`/forum/${category}/${data.id}`);
}

export async function editThread(threadId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const title = (formData.get("title") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();
  if (!title || !body) return;

  await supabase
    .from("threads")
    .update({ title, body, updated_at: new Date().toISOString() })
    .eq("id", threadId)
    .eq("user_id", user.id);

  revalidatePath(`/forum`);
}

export async function deleteThread(threadId: string, category: CategorySlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("threads")
    .delete()
    .eq("id", threadId)
    .eq("user_id", user.id);

  redirect(`/forum/${category}`);
}

export async function createReply(threadId: string, category: CategorySlug, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const body = (formData.get("body") as string)?.trim();
  if (!body) return;

  await supabase
    .from("replies")
    .insert({ thread_id: threadId, user_id: user.id, body });

  revalidatePath(`/forum/${category}/${threadId}`);
}

export async function editReply(replyId: string, threadId: string, category: CategorySlug, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const body = (formData.get("body") as string)?.trim();
  if (!body) return;

  await supabase
    .from("replies")
    .update({ body, updated_at: new Date().toISOString() })
    .eq("id", replyId)
    .eq("user_id", user.id);

  revalidatePath(`/forum/${category}/${threadId}`);
}

export async function deleteReply(replyId: string, threadId: string, category: CategorySlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("replies")
    .delete()
    .eq("id", replyId)
    .eq("user_id", user.id);

  revalidatePath(`/forum/${category}/${threadId}`);
}

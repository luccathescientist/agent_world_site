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

  const { data: profile } = await supabase.from("profiles").select("github_url").eq("id", user.id).single();
  const gh = profile?.github_url?.replace("https://github.com/", "");
  const authorName = gh ? `@${gh}` : (user.email?.split("@")[0] ?? "someone");
  const { notifyNewThread } = await import("@/lib/email");
  await notifyNewThread(title, category, data.id, authorName);

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

  // Refuse to delete if replies exist
  const { count } = await supabase
    .from("replies")
    .select("id", { count: "exact", head: true })
    .eq("thread_id", threadId);
  if (count && count > 0) return;

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

  const [{ data: profile }, { data: thread }] = await Promise.all([
    supabase.from("profiles").select("github_url").eq("id", user.id).single(),
    supabase.from("threads").select("title").eq("id", threadId).single(),
  ]);
  const gh = profile?.github_url?.replace("https://github.com/", "");
  const authorName = gh ? `@${gh}` : (user.email?.split("@")[0] ?? "someone");
  if (thread?.title) {
    const { notifyNewReply } = await import("@/lib/email");
    await notifyNewReply(thread.title, category, threadId, authorName);
  }

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

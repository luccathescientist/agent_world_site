"use server";

import { createClient } from "@/lib/supabase/server";

export async function toggleVote(
  targetId: string,
  targetType: "world" | "thread"
): Promise<{ voted: boolean; count: number }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { voted: false, count: 0 };

  const { data: existing } = await supabase
    .from("votes")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("target_id", targetId)
    .eq("target_type", targetType)
    .single();

  if (existing) {
    await supabase.from("votes").delete()
      .eq("user_id", user.id)
      .eq("target_id", targetId)
      .eq("target_type", targetType);
  } else {
    await supabase.from("votes").insert({
      user_id: user.id,
      target_id: targetId,
      target_type: targetType,
    });
  }

  const { count } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("target_id", targetId)
    .eq("target_type", targetType);

  return { voted: !existing, count: count ?? 0 };
}

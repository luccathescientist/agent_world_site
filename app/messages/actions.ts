"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function sendMessage(recipientId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (recipientId === user.id) return;

  const body = (formData.get("body") as string)?.trim();
  if (!body) return;

  await supabase.from("direct_messages").insert({
    sender_id: user.id,
    recipient_id: recipientId,
    body,
  });

  revalidatePath(`/messages/${recipientId}`);
}

export async function markConversationRead(partnerId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("direct_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .eq("sender_id", partnerId)
    .is("read_at", null);

  revalidatePath("/messages");
  revalidatePath(`/messages/${partnerId}`);
}
